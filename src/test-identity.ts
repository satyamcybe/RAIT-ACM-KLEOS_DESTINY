import { processIdentityVerification } from './features/identity/identity.service';

async function run() {
  try {
    const worker = await processIdentityVerification("dummy", "http://localhost/callback");
    console.log("SUCCESS:", JSON.stringify(worker, null, 2));
  } catch(e) {
    console.error("FAIL:", e);
  }
}
run();
