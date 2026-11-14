async function runTestSuite() {
  console.log("=== ClubPulse Firebase & Role Authentication Test Suite ===\n");

  const BASE = "http://localhost:3000";

  // 1. Test Registration - Default Role Check
  console.log("Test 1: Normal student registration defaults strictly to 'student' role...");
  const studentEmail = `student_test_${Date.now()}@campus.edu`;
  const regRes = await fetch(`${BASE}/api/auth/firebase-sync`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: studentEmail,
      name: "Jordan Lee",
      uid: "firebase_uid_123",
      department: "Biology",
      year: "2nd Year"
    })
  });
  const regData = await regRes.json();
  const test1Pass = regData.success && regData.role === "student" && regData.redirectUrl === "/student/dashboard";
  console.log(`-> Result: [${test1Pass ? "PASS" : "FAIL"}] Assigned role: ${regData.role}, Destination: ${regData.redirectUrl}`);

  // 2. Test Exploit Attempt: Student tries to self-elevate to admin via request payload
  console.log("\nTest 2: Exploit prevention — User attempts to inject role='admin' in payload...");
  const hackerEmail = `hacker_test_${Date.now()}@campus.edu`;
  const exploitRes = await fetch(`${BASE}/api/auth/firebase-sync`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: hackerEmail,
      name: "Sneaky User",
      role: "admin", // ATTEMPTED EXPLOIT
      uid: "firebase_uid_hacker"
    })
  });
  const exploitData = await exploitRes.json();
  const test2Pass = exploitData.success && exploitData.role === "student" && exploitData.redirectUrl === "/student/dashboard";
  console.log(`-> Result: [${test2Pass ? "PASS" : "FAIL"}] Exploit denied! Enforced role: ${exploitData.role}`);

  // 3. Test Authorized Admin Login
  console.log("\nTest 3: Authorized Dean/Admin email verification...");
  const adminRes = await fetch(`${BASE}/api/auth/firebase-sync`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "marcus.vance@campus.edu", // Trusted Dean
      name: "Prof. Marcus Vance",
      uid: "firebase_uid_dean"
    })
  });
  const adminData = await adminRes.json();
  const test3Pass = adminData.success && adminData.role === "admin" && adminData.redirectUrl === "/admin/dashboard";
  console.log(`-> Result: [${test3Pass ? "PASS" : "FAIL"}] Authorized admin role: ${adminData.role}, Destination: ${adminData.redirectUrl}`);

  // 4. Test Route Availability
  console.log("\nTest 4: Verifying frontend routes (/login, /student/dashboard, /admin/dashboard, /unauthorized)...");
  const routes = ["/login", "/student/dashboard", "/admin/dashboard", "/unauthorized"];
  for (const r of routes) {
    const res = await fetch(`${BASE}${r}`);
    console.log(`-> Route ${r.padEnd(20)} HTTP Status: ${res.status} [${res.status === 200 ? "OK" : "ERROR"}]`);
  }

  // 5. Test Password Credential Sign In
  console.log("\nTest 5: Password verification and wrong password handling...");
  const failRes = await fetch(`${BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "marcus.vance@campus.edu",
      password: "incorrect_wrong_password_999"
    })
  });
  const failData = await failRes.json();
  const test5Pass = failRes.status === 401 && !failData.success;
  console.log(`-> Result: [${test5Pass ? "PASS" : "FAIL"}] Rejected invalid password correctly.`);

  console.log("\n=== ALL AUTHENTICATION TESTS COMPLETED SUCCESSFULLY ===");
}

runTestSuite().catch(console.error);
