import { readFile, readdir } from "fs/promises";
import { join } from "path";

export interface DailyTip {
  id: string;
  title: string;
  content: string;
  date: string;
  fullContent?: string; // Full markdown content
}

// Parse markdown file content
function parseMarkdown(content: string): {
  title: string;
  shortTip: string;
  fullContent: string;
} {
  let title = "";
  let shortTip = "";
  const fullContent = content;

  // Extract title (first # heading)
  const titleMatch = content.match(/^#\s+(.+)$/m);
  if (titleMatch) {
    title = titleMatch[1].trim();
  }

  // Extract short tip - look for patterns like:
  // **معلومة صحية قصيرة:** followed by text
  // or ## معلومة صحية قصيرة followed by text
  const patterns = [
    /\*\*معلومة صحية قصيرة:\*\*\s*([\s\S]+?)(?=\n\n|###|##|$)/,
    /##\s*معلومة صحية قصيرة\s*\n([\s\S]+?)(?=\n\n|###|##|$)/,
    /معلومة صحية قصيرة[:\s]+\*\*([\s\S]+?)\*\*/,
  ];

  for (const pattern of patterns) {
    const match = content.match(pattern);
    if (match && match[1]) {
      shortTip = match[1].trim().replace(/\*\*/g, "").replace(/\n/g, " ");
      break;
    }
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

  return { title, shortTip, fullContent };
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
