# movingOut-sale-2026
A polished GitHub Pages moving-sale catalog.

## How to preview locally

Open `index.html` in your browser, or use VS Code Live Server.

## How to edit items

Open `items.js` and update the `SALE_ITEMS` list.

For each item, change:

- `title`
- `category`
- `price`
- `originalPrice`
- `condition`
- `status`: `Available` or `Sold`
- `image`
- `description`
- `pickup`
- `reference`

## How to add photos

1. Put your photos inside `assets/images/`.
2. Update the item image path in `items.js`.

Example:

```js
image: "assets/images/my-sofa.jpg"
```

## How to publish on GitHub Pages

1. Create a GitHub repo named `moving-sale-2026`.
2. Upload all files from this folder.
3. Go to **Settings → Pages**.
4. Select **Deploy from branch**.
5. Branch: `main`, folder: `/root`.
6. Your URL will be:

```text
https://YOUR-GITHUB-USERNAME.github.io/moving-sale-2026/
```

## Contact email

Replace `your-email@example.com` in `index.html` and `app.js` with your real email address.
