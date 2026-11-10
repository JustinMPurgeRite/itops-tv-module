# ITOps Board — TizenBrew module

Opens the ITOps wall board (`http://192.168.99.200:8080/`) on the Samsung TV through TizenBrew.

- `package.json`: TizenBrew `mods` module. `websiteURL` is the page the TV opens.
- `board.js`: injected into the page. It hides the cursor, retries the background video, reloads after the board server comes back, and does a fresh reload every 6 hours.

## Install on the TV

1. Push these files to the root of a **public** GitHub repo (TizenBrew fetches modules through jsDelivr, which only reads public repos).
2. On the TV: TizenBrew → Module Manager → add a GitHub module → type `your-user/your-repo`.
3. Select **ITOps Board** to open it.
4. TizenBrew → Settings → Autolaunch → pick **ITOps Board** so it opens when TizenBrew starts.

## Changing it later

jsDelivr caches GitHub files for up to 12 hours. After pushing a change, either wait or purge the cache by opening
`https://purge.jsdelivr.net/gh/your-user/your-repo/package.json` and `.../board.js`.
