# 2026 國中一週成全訓練

GitHub Pages project for `2026_yp_training`.

Deploy URL:

https://easternwangtl.github.io/2026_yp_training/

## Files

- `index.html`: home, today courses, series summary
- `courses.html`: searchable course list with content summaries
- `speakers.html`: speaker lookup
- `data/courses.json`: course data
- `css/style.css`: visual style
- `js/app.js`: search and rendering logic

## Deploy

1. Create repository `2026_yp_training`.
2. Upload all files in this folder.
3. Enable GitHub Pages: Settings > Pages > Deploy from branch > main / root.

## Schedule check

Course times are aligned with the handbook timetable:

- 07:00 morning life-series lessons
- 08:30 truth/humanity lessons
- 09:50 Bible reading / character practice
- 14:00 afternoon education lessons
- 16:15 afternoon second session when scheduled
- 20:00 evening lessons

Note: `教育的重要` and `定大志` are on 2026-07-02, not 2026-07-03.

## Manual content

Each course in `data/courses.json` includes a `manual` field extracted from `2026內文國中一週成全訓練手册—隊輔(v5).docx`. The course page displays this text in an expandable handbook-content block below the summary and video links.
