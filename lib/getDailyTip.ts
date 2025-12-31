import { readFile, readdir } from "fs/promises";
import { join } from "path";

export interface DailyTip {
  id: string;
  title: string;
  content: string;
  date: string;
  fullContent?: string; // Full markdown content
  healthTip?: string; // The main health tip
  steps?: Array<{ number: string; title: string; description: string }>; // Structured steps
  quickTip?: string; // Quick tip at the end
}

// Parse markdown file content
function parseMarkdown(content: string): {
  title: string;
  shortTip: string;
  fullContent: string;
  healthTip?: string;
  steps?: Array<{ number: string; title: string; description: string }>;
  quickTip?: string;
} {
  let title = "";
  let shortTip = "";
  let healthTip = "";
  const steps: Array<{ number: string; title: string; description: string }> =
    [];
  let quickTip = "";
  const fullContent = content;

  // Extract title (first # heading)
  const titleMatch = content.match(/^#\s+(.+)$/m);
  if (titleMatch) {
    title = titleMatch[1].trim();
  }

  // Extract Health Tip (after ### Health Tip:)
  const healthTipMatch = content.match(
    /###\s*Health Tip:\s*\n(.+?)(?=\n\n|###|$)/i
  );
  if (healthTipMatch) {
    healthTip = healthTipMatch[1].trim();
    shortTip = healthTip;
  }

  // Extract Explanation steps (numbered list after ### Explanation:)
  const explanationMatch = content.match(
    /###\s*Explanation:\s*\n([\s\S]+?)(?=\n\n###|$)/i
  );
  if (explanationMatch) {
    const explanationText = explanationMatch[1];
    // Parse numbered list items: 1. **Title:** Description
    // Process each line to extract all steps
    const lines = explanationText.split("\n").filter((line) => line.trim());

    for (const line of lines) {
      // Match: 1. **Title:** Description or 1. **Title**: Description (flexible with colon)
      const stepMatch = line.match(
        /^(\d+)\.\s+\*\*(.+?)\*\*\s*[:\u0589]\s*(.+)$/
      );
      if (stepMatch) {
        steps.push({
          number: stepMatch[1],
          title: stepMatch[2].trim(),
          description: stepMatch[3].trim(),
        });
      } else {
        // Fallback: try without requiring colon (for edge cases)
        const fallbackMatch = line.match(/^(\d+)\.\s+\*\*(.+?)\*\*\s+(.+)$/);
        if (fallbackMatch) {
          steps.push({
            number: fallbackMatch[1],
            title: fallbackMatch[2].trim(),
            description: fallbackMatch[3].trim(),
          });
        }
      }
    }
  }

  // Extract Quick Tip (after ### Quick Tip:)
  const quickTipMatch = content.match(
    /###\s*Quick Tip:\s*\n(.+?)(?=\n\n|###|$)/i
  );
  if (quickTipMatch) {
    quickTip = quickTipMatch[1].trim();
  }

  // Fallback: use first paragraph after title
  if (!shortTip) {
    const paragraphs = content.split(/\n\n+/);
    if (paragraphs.length > 1) {
      shortTip = paragraphs[1].replace(/\*\*/g, "").replace(/\n/g, " ").trim();
    }
  }

  // If still no short tip, use title
  if (!shortTip) {
    shortTip = title || "Daily health tip";
  }

  return { title, shortTip, fullContent, healthTip, steps, quickTip };
}

// Format date as YYYY-MM-DD
function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export async function getDailyTip(date?: Date): Promise<DailyTip | null> {
  try {
    const targetDate = date || new Date();
    const dateString = formatDate(targetDate);
    const filePath = join(
      process.cwd(),
      "content",
      "daily",
      `${dateString}.md`
    );

    try {
      const fileContent = await readFile(filePath, "utf-8");
      const parsed = parseMarkdown(fileContent);

      return {
        id: dateString,
        title: parsed.title || "Daily Health Tip",
        content: parsed.shortTip || parsed.title || "Health tip for today",
        date: targetDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        fullContent: parsed.fullContent,
        healthTip: parsed.healthTip,
        steps: parsed.steps,
        quickTip: parsed.quickTip,
      };
    } catch {
      // File doesn't exist for this date, return null
      return null;
    }
  } catch (error) {
    console.error("Error reading daily tip:", error);
    return null;
  }
}

export async function getAllDailyTips(): Promise<DailyTip[]> {
  try {
    const contentDir = join(process.cwd(), "content", "daily");
    const files = await readdir(contentDir);
    const mdFiles = files.filter((file) => file.endsWith(".md"));

    const tips: DailyTip[] = [];

    for (const file of mdFiles) {
      try {
        const filePath = join(contentDir, file);
        const fileContent = await readFile(filePath, "utf-8");
        const parsed = parseMarkdown(fileContent);
        const dateString = file.replace(".md", "");

        // Parse date from filename
        const [year, month, day] = dateString.split("-").map(Number);
        const tipDate = new Date(year, month - 1, day);

        tips.push({
          id: dateString,
          title: parsed.title || "Daily Health Tip",
          content: parsed.shortTip || parsed.title || "Health tip",
          date: tipDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          fullContent: parsed.fullContent,
          healthTip: parsed.healthTip,
          steps: parsed.steps,
          quickTip: parsed.quickTip,
        });
      } catch (fileError) {
        console.error(`Error reading file ${file}:`, fileError);
      }
    }

    // Sort by date (newest first)
    return tips.sort((a, b) => {
      const dateA = new Date(a.id);
      const dateB = new Date(b.id);
      return dateB.getTime() - dateA.getTime();
    });
  } catch (error) {
    console.error("Error reading daily tips:", error);
    return [];
  }
}
