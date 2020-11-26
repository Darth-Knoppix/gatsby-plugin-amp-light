import React from "react";

function shouldAMPlify(pathname, pathIdentifier) {
  return pathname.startsWith(pathIdentifier || "/amp");
}

export const onPreRenderHTML = (
  { pathname, replacePostBodyComponents, getPostBodyComponents },
  { pathIdentifier }
) => {
  if (shouldAMPlify(pathname, pathIdentifier)) {
    const postBodyComponents = getPostBodyComponents();

    // AMP doesn't allow extra JS
    replacePostBodyComponents(
      postBodyComponents.filter((x) => x.type !== "script")
    );
  }
};

export const onRenderBody = (
  { setHtmlAttributes, setHeadComponents, pathname },
  { language, pathIdentifier }
) => {
  // Only modify page for AMP
  if (shouldAMPlify(pathname, pathIdentifier)) {
    console.info(`⚡️ Making ${pathname} AMP ready`);
    setHtmlAttributes({
      lang: language,
      amp: "",
    });

    setHeadComponents([
      <link
        rel="preload"
        as="script"
        href="https://cdn.ampproject.org/v0.js"
        key="amp-script-preload"
      />,
      <style {...{ "amp-custom": "" }} key="amp-custom-style"></style>,
      <script async src="https://cdn.ampproject.org/v0.js" key="amp-script" />,
      <style
        key="amp-boilerplate"
        {...{ "amp-boilerplate": "" }}
        dangerouslySetInnerHTML={{
          __html: `body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}`,
        }}
      />,
      <noscript key="amp-boilerplate-noscript">
        <style
          {...{ "amp-boilerplate": "" }}
          dangerouslySetInnerHTML={{
            __html: `body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}`,
          }}
        />
      </noscript>,
    ]);
  }
};
