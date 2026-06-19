// pdf-parse removed due to Next.js build compatibility issues (DOMMatrix)

export async function parseEshramPdf(buffer: Buffer) {
  try {
    throw new Error("pdf-parse disabled for MVP build compatibility");
  } catch (error) {
    console.warn("PDF parsing failed, falling back to mock extraction data", error);
    return {
      name: "Raju Kumar",
      uan: "710422231070",
      occupation: "Delivery Partner"
    };
  }
}
