export class VectorEngine {
  /**
   * Converts a string into an array of character N-grams.
   * e.g. "zomato" with n=3 -> ["zom", "oma", "mat", "ato"]
   */
  static getNGrams(text: string, n: number = 3): string[] {
    const nGrams: string[] = [];
    const normalized = text.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (normalized.length < n) return [normalized];
    
    for (let i = 0; i <= normalized.length - n; i++) {
      nGrams.push(normalized.slice(i, i + n));
    }
    return nGrams;
  }

  /**
   * Calculates the mathematical Cosine Similarity between two strings
   * by converting them into TF (Term Frequency) Vector spaces.
   * Returns a score between 0.0 (no match) and 1.0 (perfect match).
   */
  static cosineSimilarity(textA: string, textB: string): number {
    const nGramsA = this.getNGrams(textA);
    const nGramsB = this.getNGrams(textB);

    if (nGramsA.length === 0 || nGramsB.length === 0) return 0;

    // Create unique vocabulary set
    const vocabulary = new Set([...nGramsA, ...nGramsB]);

    // Create vector representations
    const vectorA: number[] = [];
    const vectorB: number[] = [];

    vocabulary.forEach(gram => {
      // Calculate TF (Term Frequency) for each n-gram
      vectorA.push(nGramsA.filter(g => g === gram).length);
      vectorB.push(nGramsB.filter(g => g === gram).length);
    });

    // Calculate Dot Product
    let dotProduct = 0;
    for (let i = 0; i < vocabulary.size; i++) {
      dotProduct += vectorA[i] * vectorB[i];
    }

    // Calculate Magnitudes
    const magnitudeA = Math.sqrt(vectorA.reduce((sum, val) => sum + val * val, 0));
    const magnitudeB = Math.sqrt(vectorB.reduce((sum, val) => sum + val * val, 0));

    if (magnitudeA === 0 || magnitudeB === 0) return 0;

    // Return Cosine Similarity
    return dotProduct / (magnitudeA * magnitudeB);
  }
}
