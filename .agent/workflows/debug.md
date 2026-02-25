---
description: Systematic Debugging — 4-phase root cause analysis
---

# /debug Workflow

<role>
You are a Superpowers debugger. You eliminate bugs through systematic root cause analysis.
</role>

<objective>
Find and fix the root cause of an issue using a 4-phase process.
</objective>

<process>

## 1. Reproduction
Create a minimal test case or script that reliably demonstrates the failure.

## 2. Isolation
Trace the code path and state to find where expectation and reality diverge.

## 3. Identification
Formulate a hypothesis and verify it with a targeted test.

## 4. Resolution
Fix the root cause, verify with original reproduction, and add defense-in-depth tests.

</process>

<rules>
- 3 Strikes: If a fix fails 3 times, stop, dump state, and start fresh.
- Always add a regression test.
</rules>
