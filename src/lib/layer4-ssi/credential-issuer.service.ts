import crypto from 'crypto';

export interface TrustCredential {
  "@context": string[];
  id: string;
  type: string[];
  issuer: string;
  issuanceDate: string;
  credentialSubject: {
    id: string;
    trustScore: number;
    riskCategory: 'LOW' | 'MEDIUM' | 'HIGH';
    gigIncomeReliabilityIndex: number;
    metrics: {
      weeklyConsistency: number;
      monthlyIncomeStability: number;
      gigTenureMonths: number;
    };
  };
  proof?: {
    type: string;
    created: string;
    verificationMethod: string;
    proofPurpose: string;
    proofValue: string; // The cryptographic hash (SSI Signature)
  };
}

export class CredentialIssuerService {
  /**
   * Generates a Verifiable Credential (VC) and signs it using SHA-256.
   * In a real SSI environment, this would use a private key to generate an ECDSA/Ed25519 signature.
   * For the Pramaan Hackathon Demo, we generate a deterministic SHA-256 hash.
   */
  static issueCredential(
    workerId: string,
    score: number,
    risk: 'LOW' | 'MEDIUM' | 'HIGH',
    signals: any
  ): TrustCredential {
    const issuanceDate = new Date().toISOString();
    
    // GIRI is derived from the score (e.g. score of 85 -> GIRI 0.85)
    const giri = score / 100;

    const credential: TrustCredential = {
      "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://pramaan.network/credentials/v1"
      ],
      id: `urn:uuid:${crypto.randomUUID()}`,
      type: ["VerifiableCredential", "PramaanTrustCredential"],
      issuer: "did:pramaan:engine:v1",
      issuanceDate,
      credentialSubject: {
        id: `did:pramaan:worker:${workerId}`,
        trustScore: score,
        riskCategory: risk,
        gigIncomeReliabilityIndex: giri,
        metrics: {
          weeklyConsistency: signals.weeklyConsistency,
          monthlyIncomeStability: signals.monthlyIncomeStability,
          gigTenureMonths: signals.gigTenureMonths,
        }
      }
    };

    // Generate Cryptographic Hash (SSI Signature Simulation)
    // We stringify the payload deterministically to create the hash
    const payloadString = JSON.stringify(credential.credentialSubject);
    const hash = crypto.createHash('sha256').update(payloadString).digest('hex');

    credential.proof = {
      type: "PramaanCryptographicHash2026",
      created: issuanceDate,
      verificationMethod: "did:pramaan:engine:v1#key-1",
      proofPurpose: "assertionMethod",
      proofValue: hash
    };

    return credential;
  }
}
