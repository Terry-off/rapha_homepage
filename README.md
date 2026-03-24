# homepage_rapha

Static clone snapshot of [raphamedian.com](https://www.raphamedian.com/) prepared for GitHub upload and simple static hosting.

## Folder structure

```text
homepage_rapha/
├─ assets/
│  ├─ css/
│  │  └─ clone-fixes.css
│  └─ js/
│     └─ bridge.js
├─ docs/
│  └─ section-map.md
├─ reference/
│  └─ playwright-snapshot.html
├─ screenshots/
│  ├─ diff/
│  ├─ local/
│  └─ reference/
├─ scripts/
│  ├─ capture-local.mjs
│  ├─ capture-reference.mjs
│  ├─ compare-screenshots.mjs
│  └─ generate-index.mjs
├─ index.html
├─ package-lock.json
└─ package.json
```

## Run

```bash
npm install
npm run dev
```

Default local URL:

```text
http://127.0.0.1:4173
```

## Re-generate the snapshot index

```bash
npm run build
```

This rebuilds `index.html` from `reference/playwright-snapshot.html`.

## GitHub Pages deploy

This repository can be published directly from the repository root.

On GitHub:

1. Open `Settings`
2. Open `Pages`
3. Under `Build and deployment`, set `Source` to `Deploy from a branch`
4. Select branch `main`
5. Select folder `/(root)`
6. Save

The committed static entry files are:

- `index.html`
- `assets/`
- `.nojekyll`

## Visual verification

```bash
npm run capture:reference
npm run capture:local
npm run compare
```

Generated screenshots are stored in `screenshots/`.

## Notes

- The page is served as a static snapshot to keep GitHub/static-host compatibility.
- Original live assets are still loaded from the reference domain and CDN URLs.
- Executable builder scripts from the live page were removed during generation to avoid CORS failures and layout breakage on static hosting.

## Original 대비 차이점

- 라이브 사이트의 일부 Imweb 실행 스크립트는 정적 호스팅에서 CORS 문제를 일으켜 제거했습니다. 그래서 CRM, 알림, 회원, 검색, 일부 폼 후처리 같은 백엔드 의존 기능은 원본과 100% 동일하지 않습니다.
- 시각 기준의 초기 로드 상태를 우선해 스냅샷 방식으로 구성했기 때문에, 라이브 사이트의 지연 실행형 애니메이션과 특정 스크립트 기반 인터랙션은 정적 상태로 고정된 부분이 있습니다.
- 웹폰트는 원본과 동일한 Pretendard CDN을 사용하므로 별도 폰트 대체는 적용하지 않았습니다.
