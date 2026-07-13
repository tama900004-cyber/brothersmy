# BROTHER'S Header Integration

This site uses a Wix HTML component for the custom promotional/search header and Velo code in `src/pages/masterPage.js` for navigation.

## Supported HTML component IDs

The Velo bridge automatically checks these IDs in order:

1. `#htmlHeader` (preferred)
2. `#html2` (legacy/current fallback)

This means the existing Wix element can continue using `html2`. Renaming it to `htmlHeader` is optional.

## Message format sent from the HTML component

```js
window.parent.postMessage({
  source: 'brothersHeader',
  action: 'products'
}, '*');
```

Supported actions:

- `home`
- `products`
- `search` with a `query` string
- `location`

Example search message:

```js
window.parent.postMessage({
  source: 'brothersHeader',
  action: 'search',
  query: searchInput.value.trim()
}, '*');
```

## Routes

- Home: `/`
- All Products: `/category/all-products`
- Search Results: `/search?q=...`
- Location: direct Google Maps search URL for the Kelana Jaya branch

## Testing

Wix navigation does not work reliably inside the editor preview. Publish the site and test on the live URL.

Check these actions:

1. Logo opens Home.
2. All Products opens the product category.
3. A non-empty search opens Search Results with the query.
4. An empty search opens All Products.
5. Location opens Google Maps.

## Wix setup still required

- Keep the HTML element ID as `html2`, or rename it to `htmlHeader`.
- The HTML code must send the messages shown above.
- Wix Site Search must be installed and the `/search` results page must be enabled for product results.
- Publish before testing navigation.
