# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project purpose

This is an AI-assisted simulation/game for Swedish middle school students (högstadiet, år 7–9) teaching recycling and circular economy. The core bet is that simulation pedagogy — where students experience the consequences of their decisions in a compressed timeframe — produces deeper understanding than instruction-based learning.

The project is in early design phase. There is no runnable code yet.

## Target learner

Swedish middle school students (age 13–15). Prior knowledge of recycling is assumed to be at the "rule-following" level — students know *which bin*, but not *why the system works the way it does*. The simulation should move them to system-level reasoning.

## Pedagogical constraints (non-negotiable)

These are derived from the research in `Initial_doc/` and the learning goals in `doc/larmal_atervinning_hogstadiet.md`. All design and implementation decisions should be tested against them.

**Feedback on reasoning, not just answers.** The AI layer must ask "why did you think that?" and give process feedback. Correct/incorrect alone is insufficient and pedagogically counterproductive.

**Consequences must be visible.** Every student decision must have traceable downstream effects — what happens to the material after sorting, including failure modes. Abstract outcomes ("this was correct") are not enough.

**Productive difficulty over fluency.** Avoid designs that feel easy and rewarding. Retrieval effort, interleaving, and encountering genuine trade-offs are features, not bugs. Students should sometimes feel uncertain.

**Three reasoning levels to support:**
1. Procedural — sort correctly following rules
2. Conceptual — explain *why* the rules exist using material properties and system logic
3. System-critical — evaluate and redesign the system, weighing trade-offs

The simulation must be able to assess which level a student is operating at and adapt accordingly.

**No single right answer on trade-off questions.** Scenarios involving competing values (climate vs. cost vs. global justice) should require the student to argue a position, not pick the correct option.

## Key documents

| File | Contents |
|---|---|
| `doc/larmal_atervinning_hogstadiet.md` | Full learning goals: concept taxonomy, six reasoning types, three proficiency levels, simulation design requirements |
| `Initial_doc/Forskning, en bra pedagog.md` | Research synthesis on what makes great teachers — the pedagogical science underpinning design choices |
| `Initial_doc/77_skicklighetslappar.md` | 77 concrete teaching moves distilled from the research — reference when designing AI tutor behavior |

## Language

All user-facing content (UI, feedback, instructions) is in **Swedish**. Code, comments, and commit messages may be in English or Swedish — be consistent within a file.
