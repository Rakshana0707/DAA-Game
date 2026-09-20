# 🏙️ SMART CITY: THE DAA CHALLENGE

> A strategy-based smart city simulation where Design and Analysis of Algorithms power the decisions behind the city.

---

## 🎮 About the Game

**SMART CITY: THE DAA CHALLENGE** is a 2D city-management game where the player takes the role of a **City Operations Manager**.

The player is responsible for keeping the city safe, efficient, and functional by responding to emergencies, managing resources, handling transportation, and making city-development decisions.

The key idea of the project is that the player **does not directly solve algorithmic problems**.

Instead, DAA algorithms operate behind the scenes as the **intelligence and optimization engine of the city**.

For example:

- The player dispatches an ambulance.
- The game automatically calculates an efficient route.
- The player manages emergency supplies.
- The game automatically optimizes resource allocation.
- The player manages city infrastructure.
- The game determines an efficient infrastructure network.

This makes the project both a **playable game** and a practical demonstration of DAA concepts.

---

## 🎯 Objectives

The main objectives of the project are:

- Build a playable smart-city simulation.
- Apply DAA concepts to real-world city-management problems.
- Use algorithms as part of the game's internal decision-making engine.
- Demonstrate how algorithmic optimization can be applied to real-world scenarios.
- Gradually increase gameplay difficulty through multiple levels.
- Keep the player focused on decision-making rather than manually solving algorithms.

---

## 🕹️ Gameplay

The player manages a growing city and responds to different situations.

### The player can:

- 🚑 Dispatch emergency vehicles
- 🚒 Respond to fires
- 🚨 Handle accidents
- 🚦 Manage traffic
- 🏗️ Expand city infrastructure
- 💰 Manage the city budget
- 🚚 Allocate emergency resources
- 🚌 Manage transportation
- ♻️ Manage waste collection
- 📡 Respond to communication failures
- 🏥 Manage city services

The city becomes progressively more complex as the player advances through the levels.

---

## 🚧 Current Progress

- [x] Base game structure
- [x] Level management
- [x] Level 1 — First Day in the City
- [x] Level 2 — Busy Morning
- [ ] Level 3 — Rush Hour
- [ ] Level 4 — Emergency Route
- [ ] Level 5 — City Expansion
- [ ] Level 6 — Emergency Supply Crisis
- [ ] Level 7 — City-Wide Transport
- [ ] Level 8 — Communication Breakdown
- [ ] Level 9 — Clean City
- [ ] Level 10 — The City Crisis

---

## 🧠 DAA Behind the Game

The algorithms are implemented as separate modules and are called by the game engine whenever a suitable situation occurs.

### Divide and Conquer

| Algorithm | Game Application |
|---|---|
| Binary Search | Finding minimum resources required for a target |
| Maximum and Minimum | Finding most/least severe city incidents |
| Merge Sort | Organizing emergency incidents |
| Quick Sort | Sorting city events and priorities |
| Strassen's Matrix Multiplication | Processing city interaction matrices |

### Greedy

| Algorithm | Game Application |
|---|---|
| Knapsack | Emergency resource allocation |
| Minimum Cost Spanning Tree | City infrastructure expansion |
| Optimal Merge Pattern | Combining city data/information |
| Single Source Shortest Path | Emergency vehicle routing |

### Dynamic Programming

| Algorithm | Game Application |
|---|---|
| Multistage Graph | Multi-stage evacuation |
| All-Pairs Shortest Path | City-wide transportation |
| Single Source Shortest Path | Suitable shortest-path scenarios |
| String Editing | Correcting corrupted emergency messages |
| Travelling Salesperson Problem | Waste collection and multi-location routes |
| Flow Shop Scheduling | Scheduling city-service operations |

> The exact algorithm used for each scenario may depend on the implementation and the DAA syllabus requirements.

---

# 📈 Level Progression

The game is designed so that difficulty increases **between levels**, rather than overwhelming the player inside a single level.

Completing a level successfully unlocks the next level. Starting, viewing, restarting, or partially completing a level does not unlock the next level.

### Level 1 — First Day in the City 🟢

Status:
COMPLETED

Gameplay features completed:

- [x] Level 1 Help / Guide
- [x] Day 1 city briefing
- [x] Medical emergency event
- [x] Ambulance selection
- [x] Ambulance response
- [x] Route visualization
- [x] Traffic complication
- [x] Player route decision
- [x] Hospital management decision
- [x] City Safety consequences
- [x] Emergency resolution
- [x] Day 1 performance report
- [x] Level completion system
- [x] Sequential Level 2 unlock

"The player begins their first day as the City Operations Manager. After observing the city, the player responds to a medical emergency by selecting an available ambulance, monitoring its response, handling a traffic complication, and preparing the hospital for the incoming patient. The player's decisions affect city conditions and the final Day 1 report."

DAA USED:

Binary Search:
Used internally for emergency resource estimation.

*Note: The player does not manually solve Binary Search.*

---

### Level 2 — Busy Morning 🟢

Multiple emergencies begin occurring.

- Medical emergency
- Fire
- Road accident
- Limited emergency vehicles

Algorithms introduced:

- Maximum and Minimum
- Merge Sort
- [x] Level 2 player guide / help manual

---

### Level 3 — Rush Hour 🟡

The city becomes busier.

- Multiple simultaneous events
- Traffic congestion
- Limited vehicles
- Higher time pressure

Algorithms introduced:

- Quick Sort
- Greedy strategy

---

### Level 4 — Emergency Route 🟡

The city expands and emergency locations become farther away.

The player dispatches emergency vehicles while the game automatically determines efficient routes.

Algorithm:

- Single Source Shortest Path

---

### Level 5 — City Expansion 🟡

The player begins expanding the city.

The player must manage:

- New buildings
- Roads
- Construction budget
- Infrastructure

Algorithms:

- Minimum Cost Spanning Tree
- Optimal Merge Pattern

---

### Level 6 — Emergency Supply Crisis 🟠

A major environmental event creates a resource shortage.

The player manages:

- Food
- Water
- Medicine
- Fuel
- Emergency vehicles

Algorithms:

- Knapsack
- Multistage Graph

---

### Level 7 — City-Wide Transport 🟠

The city now contains a larger transportation network.

The player manages:

- Buses
- Traffic
- Multiple routes
- Important city locations

Algorithm:

- All-Pairs Shortest Path / Floyd-Warshall

---

### Level 8 — Communication Breakdown 🟠

The city's emergency communication system begins receiving corrupted messages.

Example:
```text
F1re at Secor 4
Ambulnce needed at Block B
Powr failure in Zone 3
```
The game engine must automatically decipher them to locate the emergency.

Algorithm:
- String Editing / Levenshtein Distance

---

### Level 9 — Waste Management 🔴

The city's sanitation grid is overwhelmed.

The player must schedule waste collection trucks across multiple neighborhood hubs to keep sanitation levels high and prevent disease outbreaks.

Algorithm:
- Travelling Salesperson Problem

---

### Level 10 — City Administrator 🔴

The ultimate challenge. 

- Massive sprawling metropolis.
- Frequent dynamic emergencies.
- Massive infrastructure load.
- Severe resource and budgetary constraints.

The game simultaneously processes all DAA algorithms in the background to sustain the city engine while the player makes high-level survival decisions.

Algorithms:
- Flow Shop Scheduling
- Strassen's Matrix Multiplication
- Full DAA Suite
