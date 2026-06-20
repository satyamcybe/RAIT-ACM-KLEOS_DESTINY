import { NextResponse } from 'next/server';
import { prisma } from '@/lib/database/prisma';
import { ScoreCalculatorService } from '@/lib/layer4-ssi/score-calculator.service';
import { CredentialIssuerService } from '@/lib/layer4-ssi/credential-issuer.service';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { workerId, signals } = body;

    if (!workerId || !signals) {
      return NextResponse.json({ error: 'workerId and signals are required' }, { status: 400 });
    }

    // 1. Calculate Score out of 100
    const score = ScoreCalculatorService.calculatePramaanScore(signals);
    
    // 2. Determine Risk
    const risk = ScoreCalculatorService.determineRiskCategory(score);

    // 3. Issue Cryptographic Credential (SSI)
    const credential = CredentialIssuerService.issueCredential(workerId, score, risk, signals);

    // 4. Save to Database
    let savedCredential;
    try {
      savedCredential = await prisma.credential.create({
        data: {
          workerId: workerId,
          type: 'reputation',
          issuer: 'did:pramaan:engine:v1',
          subject: credential.credentialSubject,
          claims: credential.credentialSubject.metrics as object,
          proof: credential.proof as object,
          status: 'active'
        }
      });
    } catch (dbError) {
      console.warn("DB Error while saving credential, continuing for hackathon demo:", dbError);
    }

    return NextResponse.json({
      success: true,
      message: 'Trust Credential generated successfully',
      data: {
        score,
        risk,
        credential,
        dbRecordId: savedCredential?.id
      }
    });
  } catch (error) {
    console.error('Credential Issuance Error:', error);
    return NextResponse.json({ error: 'Failed to issue credential' }, { status: 500 });
  }
}
