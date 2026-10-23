# The Little Herb Garden

## Team Members
- Gayathri Devi Shalini Dileep (@gayathridsd18-wq)
- Sobin Karakkunnummel (@Sobink06)

A single-page application built with semantic HTML, responsive CSS, and asynchronous JavaScript.

## Herb Data Schema
Individual herb detail files are stored as `data/<herb>.json` adhering to this schema:

```json
{
  "id": "slug-name",
  "name": "Herb Common Name",
  "latin": "Latin Botanical Name",
  "life": "annual / biennial / perennial",
  "description": "Botanical and historical summary",
  "use": "Culinary, tea, and aromatic uses",
  "tips": "Gardening, sunlight, and irrigation practices"
}

Features Implemented
Complete Herb Dataset: Dedicated JSON files for all 8 garden herbs.

Dynamic Single-Page Hash Routing: Navigation without page reloads.

Resilience and Fallbacks: Handles 404 errors gracefully.

Keyboard Accessibility: Operable with Tab, Enter, and Escape.

Group Feature: Live real-time search filter.