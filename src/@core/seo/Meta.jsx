const Meta = ({
  title,
  type = "website",
  description = "description",
  robots = "index,follow",
  imageUrl,
  imageWidth,
  imageHeight,
  children,
}) => {
  const siteName = "MYC";
  if (title === undefined) {
    title = siteName;
  } else {
    title = `${title} - ${siteName}`;
  }
  const width = imageWidth ? imageWidth : 800;
  const height = imageHeight ? imageHeight : 600;
  const url = "";
  return (
    <>
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1.0,maximum-scale=1.0"
      />
      <meta name="robots" content={robots} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      {imageUrl ? <meta property="og:image" content={imageUrl} /> : ""}
      {imageUrl ? (
        <meta property="og:image:width" content={String(width)} />
      ) : (
        ""
      )}
      {imageUrl ? (
        <meta property="og:image:height" content={String(height)} />
      ) : (
        ""
      )}

      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link
        href="/favicon/apple-touch-icon.png"
        rel="apple-touch-icon"
        sizes="180x180"
      />
      <link
        href="/favicon/favicon-32x32.png"
        rel="icon"
        sizes="32x32"
        type="image/png"
      />
      <link
        href="/favicon/favicon-16x16.png"
        rel="icon"
        sizes="16x16"
        type="image/png"
      />
      <link href="/favicon/site.webmanifest" rel="manifest" />
      <link
        color="#000000"
        href="/favicon/safari-pinned-tab.svg"
        rel="mask-icon"
      />
      <link href="/favicon/favicon.ico" rel="shortcut icon" />

      {children}
    </>
  );
};

export default Meta;
