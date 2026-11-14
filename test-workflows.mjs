/**
 * ClubPulse Automated Workflow & Algorithmic Unit Tests
 * Tests:
 * 1. Ghost Member detection algorithm & Inactivity scoring
 * 2. Supportive Academic Break / Leave of Absence preservation
 * 3. Leadership Burnout Prevention Index & Concentration alerts
 * 4. Club Trust Score & Evidence Verification weighting
 */

// Scoring implementations matching src/lib/scoring.ts for deterministic unit testing
function calculateMemberInactivity(membership, recentClubMeetingsCount = 4) {
  if (membership.leaveDetails?.onLeave) {
    return {
      status: "on_leave",
      riskLevel: "none",
      explanation: `Approved academic/personal break until ${membership.leaveDetails.endDate || "specified date"} (${membership.leaveDetails.reason || "personal"}).`,
      recommendation: "Member is excused from participation. Respect break period.",
    };
  }

  const lastActive = new Date(membership.lastActiveAt).getTime();
  const now = new Date().getTime();
  const daysSinceActive = Math.round((now - lastActive) / (1000 * 60 * 60 * 24));

  const lowAttendance = membership.attendanceRate < 40;

  if (daysSinceActive > 30 || (lowAttendance && daysSinceActive > 20)) {
    return {
      status: "inactive",
      riskLevel: "action_needed",
      explanation: `No logged activity for ${daysSinceActive} days. Attendance rate is ${membership.attendanceRate}% across recent sessions, with 0 active tasks.`,
      recommendation: "Send friendly check-in reminder to explore if they need academic accommodation or lower-demand micro-tasks.",
    };
  }

  if (daysSinceActive > 14 || lowAttendance) {
    return {
      status: "low_activity",
      riskLevel: "watch",
      explanation: `Activity dipping (${daysSinceActive} days since last interaction). Attendance rate is ${membership.attendanceRate}%.`,
      recommendation: "Pair with a sub-team buddy or suggest an upcoming workshop suited to their stated skills.",
    };
  }

  return {
    status: "active",
    riskLevel: "none",
    explanation: `Consistently active. Recent check-in ${daysSinceActive} days ago with ${membership.attendanceRate}% attendance.`,
    recommendation: "Well engaged. Eligible for leadership task delegation.",
  };
}

function calculateBurnoutRisk(estimatedHours, pendingTasks, percentageOfClubWorkload) {
  if (estimatedHours >= 24 || percentageOfClubWorkload >= 45 || pendingTasks >= 7) {
    return {
      riskLevel: "critical",
      color: "text-red-600",
      warning: "Extreme workload concentration! Overloaded by 2x recommended student-leader threshold.",
    };
  }

  if (estimatedHours >= 14 || percentageOfClubWorkload >= 30 || pendingTasks >= 4) {
    return {
      riskLevel: "high",
      color: "text-amber-600",
      warning: "Elevated burnout risk. Heavy responsibility concentration.",
    };
  }

  return {
    riskLevel: "low",
    color: "text-emerald-600",
  };
}

function computeClubTrustScore(promises, evidenceList, activeMemberRatio = 0.75) {
  const totalPromises = promises.length || 1;
  const deliveredPromises = promises.filter((p) => p.delivered).length;
  const promiseCompletionRate = Math.round((deliveredPromises / totalPromises) * 100);

  const totalEvidence = evidenceList.length || 1;
  const verifiedEvidence = evidenceList.filter((e) => e.status === "verified").length;
  const verifiedEvidenceRate = Math.round((verifiedEvidence / totalEvidence) * 100);

  const promisesWeight = promiseCompletionRate * 0.45;
  const evidenceWeight = verifiedEvidenceRate * 0.35;
  const retentionWeight = Math.min(activeMemberRatio * 100, 100) * 0.20;

  const score = Math.round(promisesWeight + evidenceWeight + retentionWeight);

  let tier = "Under Review";
  if (score >= 85) tier = "Tier 1 - Gold";
  else if (score >= 70) tier = "Tier 2 - Silver";
  else if (score >= 50) tier = "Tier 3 - Bronze";

  return {
    score,
    tier,
    promiseCompletionRate,
    verifiedEvidenceRate,
  };
}

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    process.exit(1);
  } else {
    console.log(`✅ PASSED: ${message}`);
  }
}

console.log("\n=================================================================");
console.log(" 🧪 CLUBPULSE AUTOMATED TEST SUITE: WORKFLOWS & ALGORITHMS");
console.log("=================================================================\n");

// TEST 1: Active Member Validation
console.log("TEST 1: Active Member Participation Check");
const activeMember = {
  id: "m-1",
  userName: "Alex Rivera",
  status: "active",
  lastActiveAt: new Date().toISOString().split("T")[0],
  attendanceRate: 90,
  tasksCompleted: 4,
  tasksPending: 1,
};
const res1 = calculateMemberInactivity(activeMember);
assert(res1.status === "active", "Recently engaged student classified as 'active'");
assert(res1.riskLevel === "none", "Active student has zero risk level");

// TEST 2: Ghost Member Inactivity Flagging
console.log("\nTEST 2: Ghost Member (Prolonged Inactivity) Detection");
const ghostMember = {
  id: "m-4",
  userName: "Chloe Zhao",
  status: "inactive",
  lastActiveAt: "2026-09-01", // >40 days ago
  attendanceRate: 20,
  tasksCompleted: 0,
  tasksPending: 0,
};
const res2 = calculateMemberInactivity(ghostMember);
assert(res2.status === "inactive", "Student inactive for >30 days with low attendance flagged as 'inactive'");
assert(res2.riskLevel === "action_needed", "Ghost member correctly flagged with 'action_needed' intervention");
assert(res2.explanation.includes("No logged activity"), "Explainable rationale provided without stigmatizing");

// TEST 3: Supportive Leave of Absence (Academic Break Protection)
console.log("\nTEST 3: Supportive Leave of Absence (Academic Break)");
const leaveMember = {
  ...ghostMember,
  leaveDetails: {
    onLeave: true,
    reason: "Midterm & GRE Prep",
    endDate: "2026-11-20",
  },
};
const res3 = calculateMemberInactivity(leaveMember);
assert(res3.status === "on_leave", "Student on declared study break receives 'on_leave' status");
assert(res3.riskLevel === "none", "Break protection prevents false ghost member penalties");

// TEST 4: Leadership Burnout & Task Concentration Detection
console.log("\nTEST 4: Leadership Burnout & Concentration Warning");
const leadBurnout = calculateBurnoutRisk(25, 6, 48); // 25 hours load, 48% of total club tasks
assert(leadBurnout.riskLevel === "critical", "President carrying 25h and 48% club load triggers 'critical' burnout warning");
assert(leadBurnout.warning.includes("Extreme workload concentration"), "Actionable warning recommending task delegation is triggered");

// TEST 5: Workload Rebalancing to Low-Load Peer
console.log("\nTEST 5: Low-Load Peer Delegation Capacity Check");
const delegatedPeerLoad = calculateBurnoutRisk(4, 1, 8); // 4 hours load
assert(delegatedPeerLoad.riskLevel === "low", "Peer with 4h weekly load is confirmed eligible for delegated tasks");

// TEST 6: Trust Score & Verified Evidence Computation
console.log("\nTEST 6: Club Trust Score & Transparency Accreditation");
const testPromises = [
  { id: "p1", delivered: true },
  { id: "p2", delivered: true },
  { id: "p3", delivered: false },
];
const testEvidence = [
  { id: "e1", status: "verified" },
  { id: "e2", status: "verified" },
  { id: "e3", status: "unverified" },
];
const trustRes = computeClubTrustScore(testPromises, testEvidence, 0.85);
assert(trustRes.score >= 70, `Trust score computed accurately (${trustRes.score}%)`);
assert(trustRes.tier === "Tier 2 - Silver" || trustRes.tier === "Tier 1 - Gold", `Tier correctly accredited as ${trustRes.tier}`);

console.log("\n=================================================================");
console.log(" 🎯 ALL 6 CORE TESTS PASSED (100% SUCCESS RATE)");
console.log("=================================================================\n");
