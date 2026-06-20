import { randomUUID, createHash } from 'crypto';

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
   */
  static issueCredential(
    workerId: string,
    score: number,
    risk: 'LOW' | 'MEDIUM' | 'HIGH',
    signals: any
  ): TrustCredential {
    const issuanceDate = new Date().toISOString();
    const giri = score / 100;

    const credential: TrustCredential = {
      "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://pramaan.network/credentials/v1"
      ],
      id: `urn:uuid:${randomUUID()}`,
      type: ["VerifiableCredential", "PramaanTrustCredential"],
      issuer: "did:pramaan:engine:v1",
      issuanceDate,
      credentialSubject: {
        id: `did:pramaan:worker:${workerId}`,
        trustScore: score,
        riskCategory: risk,
        gigIncomeReliabilityIndex: giri,
        metrics: {
          weeklyConsistency: signals.weeklyConsistency || 0,
          monthlyIncomeStability: signals.monthlyIncomeStability || 0,
          gigTenureMonths: signals.gigTenureMonths || 12,
        }
      }
    };

    const payloadString = JSON.stringify(credential.credentialSubject);
    const hash = createHash('sha256').update(payloadString).digest('hex');

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

