var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, copyDefault, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toESM = (module2, isNodeMode) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", !isNodeMode && module2 && module2.__esModule ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __toCommonJS = /* @__PURE__ */ ((cache2) => {
  return (module2, temp) => {
    return cache2 && cache2.get(module2) || (temp = __reExport(__markAsModule({}), module2, 1), cache2 && cache2.set(module2, temp), temp);
  };
})(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : 0);

// node_modules/@remix-run/dev/compiler/shims/react.ts
var React;
var init_react = __esm({
  "node_modules/@remix-run/dev/compiler/shims/react.ts"() {
    React = __toESM(require("react"));
  }
});

// node_modules/remix/index.js
var require_remix = __commonJS({
  "node_modules/remix/index.js"(exports) {
    "use strict";
    init_react();
    Object.defineProperty(exports, "__esModule", { value: true });
    var node = require("@remix-run/node");
    Object.defineProperty(exports, "createFileSessionStorage", {
      enumerable: true,
      get: function() {
        return node.createFileSessionStorage;
      }
    });
    Object.defineProperty(exports, "unstable_createFileUploadHandler", {
      enumerable: true,
      get: function() {
        return node.unstable_createFileUploadHandler;
      }
    });
    Object.defineProperty(exports, "unstable_createMemoryUploadHandler", {
      enumerable: true,
      get: function() {
        return node.unstable_createMemoryUploadHandler;
      }
    });
    Object.defineProperty(exports, "unstable_parseMultipartFormData", {
      enumerable: true,
      get: function() {
        return node.unstable_parseMultipartFormData;
      }
    });
    Object.defineProperty(exports, "__esModule", { value: true });
    var serverRuntime = require("@remix-run/server-runtime");
    Object.defineProperty(exports, "createCookie", {
      enumerable: true,
      get: function() {
        return serverRuntime.createCookie;
      }
    });
    Object.defineProperty(exports, "createCookieSessionStorage", {
      enumerable: true,
      get: function() {
        return serverRuntime.createCookieSessionStorage;
      }
    });
    Object.defineProperty(exports, "createMemorySessionStorage", {
      enumerable: true,
      get: function() {
        return serverRuntime.createMemorySessionStorage;
      }
    });
    Object.defineProperty(exports, "createSession", {
      enumerable: true,
      get: function() {
        return serverRuntime.createSession;
      }
    });
    Object.defineProperty(exports, "createSessionStorage", {
      enumerable: true,
      get: function() {
        return serverRuntime.createSessionStorage;
      }
    });
    Object.defineProperty(exports, "isCookie", {
      enumerable: true,
      get: function() {
        return serverRuntime.isCookie;
      }
    });
    Object.defineProperty(exports, "isSession", {
      enumerable: true,
      get: function() {
        return serverRuntime.isSession;
      }
    });
    Object.defineProperty(exports, "json", {
      enumerable: true,
      get: function() {
        return serverRuntime.json;
      }
    });
    Object.defineProperty(exports, "redirect", {
      enumerable: true,
      get: function() {
        return serverRuntime.redirect;
      }
    });
    Object.defineProperty(exports, "__esModule", { value: true });
    var react = require("@remix-run/react");
    Object.defineProperty(exports, "Form", {
      enumerable: true,
      get: function() {
        return react.Form;
      }
    });
    Object.defineProperty(exports, "Link", {
      enumerable: true,
      get: function() {
        return react.Link;
      }
    });
    Object.defineProperty(exports, "Links", {
      enumerable: true,
      get: function() {
        return react.Links;
      }
    });
    Object.defineProperty(exports, "LiveReload", {
      enumerable: true,
      get: function() {
        return react.LiveReload;
      }
    });
    Object.defineProperty(exports, "Meta", {
      enumerable: true,
      get: function() {
        return react.Meta;
      }
    });
    Object.defineProperty(exports, "NavLink", {
      enumerable: true,
      get: function() {
        return react.NavLink;
      }
    });
    Object.defineProperty(exports, "Outlet", {
      enumerable: true,
      get: function() {
        return react.Outlet;
      }
    });
    Object.defineProperty(exports, "PrefetchPageLinks", {
      enumerable: true,
      get: function() {
        return react.PrefetchPageLinks;
      }
    });
    Object.defineProperty(exports, "RemixBrowser", {
      enumerable: true,
      get: function() {
        return react.RemixBrowser;
      }
    });
    Object.defineProperty(exports, "RemixServer", {
      enumerable: true,
      get: function() {
        return react.RemixServer;
      }
    });
    Object.defineProperty(exports, "Scripts", {
      enumerable: true,
      get: function() {
        return react.Scripts;
      }
    });
    Object.defineProperty(exports, "ScrollRestoration", {
      enumerable: true,
      get: function() {
        return react.ScrollRestoration;
      }
    });
    Object.defineProperty(exports, "useActionData", {
      enumerable: true,
      get: function() {
        return react.useActionData;
      }
    });
    Object.defineProperty(exports, "useBeforeUnload", {
      enumerable: true,
      get: function() {
        return react.useBeforeUnload;
      }
    });
    Object.defineProperty(exports, "useCatch", {
      enumerable: true,
      get: function() {
        return react.useCatch;
      }
    });
    Object.defineProperty(exports, "useFetcher", {
      enumerable: true,
      get: function() {
        return react.useFetcher;
      }
    });
    Object.defineProperty(exports, "useFetchers", {
      enumerable: true,
      get: function() {
        return react.useFetchers;
      }
    });
    Object.defineProperty(exports, "useFormAction", {
      enumerable: true,
      get: function() {
        return react.useFormAction;
      }
    });
    Object.defineProperty(exports, "useHref", {
      enumerable: true,
      get: function() {
        return react.useHref;
      }
    });
    Object.defineProperty(exports, "useLoaderData", {
      enumerable: true,
      get: function() {
        return react.useLoaderData;
      }
    });
    Object.defineProperty(exports, "useLocation", {
      enumerable: true,
      get: function() {
        return react.useLocation;
      }
    });
    Object.defineProperty(exports, "useMatches", {
      enumerable: true,
      get: function() {
        return react.useMatches;
      }
    });
    Object.defineProperty(exports, "useNavigate", {
      enumerable: true,
      get: function() {
        return react.useNavigate;
      }
    });
    Object.defineProperty(exports, "useNavigationType", {
      enumerable: true,
      get: function() {
        return react.useNavigationType;
      }
    });
    Object.defineProperty(exports, "useOutlet", {
      enumerable: true,
      get: function() {
        return react.useOutlet;
      }
    });
    Object.defineProperty(exports, "useOutletContext", {
      enumerable: true,
      get: function() {
        return react.useOutletContext;
      }
    });
    Object.defineProperty(exports, "useParams", {
      enumerable: true,
      get: function() {
        return react.useParams;
      }
    });
    Object.defineProperty(exports, "useResolvedPath", {
      enumerable: true,
      get: function() {
        return react.useResolvedPath;
      }
    });
    Object.defineProperty(exports, "useSearchParams", {
      enumerable: true,
      get: function() {
        return react.useSearchParams;
      }
    });
    Object.defineProperty(exports, "useSubmit", {
      enumerable: true,
      get: function() {
        return react.useSubmit;
      }
    });
    Object.defineProperty(exports, "useTransition", {
      enumerable: true,
      get: function() {
        return react.useTransition;
      }
    });
  }
});

// <stdin>
var stdin_exports = {};
__export(stdin_exports, {
  assets: () => assets_manifest_default,
  entry: () => entry,
  routes: () => routes
});
init_react();

// server-entry-module:@remix-run/dev/server-build
init_react();

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
init_react();
var import_server = require("react-dom/server");
var import_remix = __toESM(require_remix());
var dotenv = require("dotenv");
dotenv.config();
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  const markup = (0, import_server.renderToString)(/* @__PURE__ */ React.createElement(import_remix.RemixServer, {
    context: remixContext,
    url: request.url
  }));
  responseHeaders.set("Content-Type", "text/html");
  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders
  });
}

// route:/Users/julianjark/personlig/daysoff-ui/app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  meta: () => meta
});
init_react();
var import_remix2 = __toESM(require_remix());
var meta = () => {
  return { title: "Daysoff UI" };
};
function App() {
  return /* @__PURE__ */ React.createElement("html", {
    lang: "en"
  }, /* @__PURE__ */ React.createElement("head", null, /* @__PURE__ */ React.createElement("meta", {
    charSet: "utf-8"
  }), /* @__PURE__ */ React.createElement("meta", {
    name: "viewport",
    content: "width=device-width,initial-scale=1"
  }), /* @__PURE__ */ React.createElement("link", {
    rel: "stylesheet",
    href: "https://unpkg.com/@picocss/pico@latest/css/pico.min.css"
  }), /* @__PURE__ */ React.createElement(import_remix2.Meta, null), /* @__PURE__ */ React.createElement(import_remix2.Links, null)), /* @__PURE__ */ React.createElement("body", null, /* @__PURE__ */ React.createElement(import_remix2.Outlet, null), /* @__PURE__ */ React.createElement(import_remix2.ScrollRestoration, null), /* @__PURE__ */ React.createElement(import_remix2.Scripts, null), /* @__PURE__ */ React.createElement(import_remix2.LiveReload, null)));
}

// route:/Users/julianjark/personlig/daysoff-ui/app/routes/index.tsx
var routes_exports = {};
__export(routes_exports, {
  default: () => Index,
  loader: () => loader
});
init_react();
var import_remix3 = __toESM(require_remix());

// app/daysoffClient.ts
init_react();
var import_axios = __toESM(require("axios"));
var import_axios_cookiejar_support = require("axios-cookiejar-support");
var import_tough_cookie = require("tough-cookie");
var import_cheerio = require("cheerio");
var import_ioredis = __toESM(require("ioredis"));

// app/domain.ts
init_react();
var allowsDogs = (cabin) => {
  var _a, _b;
  return ((_a = cabin.rules.Husregler) == null ? void 0 : _a.includes("Tillat med husdyr")) && !((_b = cabin.rules.Husregler) == null ? void 0 : _b.includes("Ikke tillat med husdyr"));
};
var hasSauna = (cabin) => cabin.facilities.includes("Badstue");
var preparedCabin = (cabin) => __spreadProps(__spreadValues({}, cabin), {
  get locationName() {
    return cabin.specifications.Beliggenhet;
  },
  get allowsDogs() {
    return allowsDogs(cabin);
  },
  get hasInternet() {
    return cabin.facilities.includes("Internett");
  },
  get hasSauna() {
    return hasSauna(cabin);
  },
  get hasHottub() {
    return cabin.facilities.includes("Boblebad");
  },
  get bedrooms() {
    return Number(cabin.specifications.Soverom);
  }
});
var DAYSOFF_BASEURL = "https://firmahytte.daysoff.no";

// app/daysoffClient.ts
var redisClient = new import_ioredis.default(process.env.REDIS_URL);
var cache = redisClient;
var jar = new import_tough_cookie.CookieJar();
var client = (0, import_axios_cookiejar_support.wrapper)(import_axios.default.create({ jar }));
var fetchToken = async () => {
  const parseToken = (data) => {
    const $ = (0, import_cheerio.load)(data);
    const token = $("form input[name=_token]").first().attr("value");
    if (token === void 0)
      throw new Error("could not fetch token");
    return token;
  };
  const html = await client.get(`${DAYSOFF_BASEURL}/`);
  return parseToken(html.data);
};
var login = async () => {
  const token = await fetchToken();
  const response = await client.post(`${DAYSOFF_BASEURL}/check`, new URLSearchParams({
    _token: token,
    email: process.env.DAYSOFF_EMAIL,
    password: process.env.DAYSOFF_PASSWORD
  }));
  return {
    status: response.status
  };
};
var fetchCabinsSimple = async (category) => {
  const cached = await cache.hget("cabinsSimple", String(category));
  if (cached !== null) {
    return JSON.parse(cached);
  }
  const response = await client.get(`${DAYSOFF_BASEURL}/resultater?cat=${category}`);
  const $ = (0, import_cheerio.load)(response.data);
  const cabinsRaw = $("a.search-results--listings--items__item").get();
  if (cabinsRaw.length === 0)
    throw new Error("Could not fetch cabins");
  const cabins = cabinsRaw.map((e) => ({
    link: e.attribs.href,
    title: e.attribs.title,
    image: $(e).find("img").first().attr("src")
  }));
  await cache.hset("cabinsSimple", String(category), JSON.stringify(cabins));
  return cabins;
};
var fetchCabinDetailed = async (cabinSimple) => {
  const cached = await cache.hget("cabins", cabinSimple.link);
  if (cached !== null) {
    return JSON.parse(cached);
  }
  const response = await client.get(`${DAYSOFF_BASEURL}${cabinSimple.link}`);
  const $ = (0, import_cheerio.load)(response.data);
  if ($(".object--specifications__item").length === 0)
    throw new Error("Could not fetch cabin details");
  const locationMatch = response.data.match(/new google.maps.LatLng\((.+), (.+)\);/);
  const lat = locationMatch[1];
  const lng = locationMatch[2];
  const cabinDetailed = {
    link: cabinSimple.link,
    title: $("h1").text(),
    images: $(".image_lightbox--images--item").get().map((e) => $(e).find("img").attr("src")),
    specifications: $(".object--specifications__item").get().map((e) => ({
      [$(e).find(".specification-label").text()]: $(e).find(".specification-content").text()
    })).reduce((acc, x) => __spreadValues(__spreadValues({}, acc), x), {}),
    description: $(".object--description > .column").html().trim(),
    rules: $(".object--rules__content__content").get().map((e) => ({
      [$(e).find("h2").text()]: $(e).html().replace(/\<h2\>.+\<\/h2\>/, "").trim()
    })).reduce((acc, x) => __spreadValues(__spreadValues({}, acc), x), {}),
    facilities: $(".object--facilities__list--item").get().map((e) => $(e).text().trim()),
    location: { lat, lng },
    closeby: $(".object--closeby__wrap__item--content").get().map((e) => $(e).find("h3").text().trim())
  };
  await cache.hset("cabins", cabinSimple.link, JSON.stringify(cabinDetailed));
  return cabinDetailed;
};
function chunk(array, size) {
  const chunkedArray = [];
  for (let i = 0; i < array.length; i += size) {
    chunkedArray.push(array.slice(i, i + size));
  }
  return chunkedArray;
}
var fetchCabinsForCategory = async (category, retry = true) => {
  try {
    const cabinsSimple = await fetchCabinsSimple(category);
    let cabinsDetailed = [];
    for (let cabins of chunk(cabinsSimple, 30)) {
      const res = await Promise.all(cabins.map(fetchCabinDetailed));
      cabinsDetailed = cabinsDetailed.concat(res);
    }
    return cabinsDetailed;
  } catch (e) {
    if (!retry)
      throw e;
    await login();
    return await fetchCabinsForCategory(category);
  }
};

// app/components/DebugData.tsx
init_react();
var import_react = __toESM(require("react"));
var DebugData = ({ data }) => {
  if (typeof data === "string")
    return /* @__PURE__ */ import_react.default.createElement("pre", null, data);
  const entries = Object.entries(data).map(([key, value]) => /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, {
    key
  }, /* @__PURE__ */ import_react.default.createElement("h3", null, key), /* @__PURE__ */ import_react.default.createElement("pre", null, typeof value === "string" ? value : JSON.stringify(value, null, 2))));
  return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, entries);
};
var DebugData_default = DebugData;

// app/components/CabinCard.tsx
init_react();
var CabinCard = ({ cabin }) => {
  return /* @__PURE__ */ React.createElement("article", null, /* @__PURE__ */ React.createElement("header", null, /* @__PURE__ */ React.createElement("a", {
    href: `${DAYSOFF_BASEURL}${cabin.link}`
  }, /* @__PURE__ */ React.createElement("h2", null, cabin.title))), allowsDogs(cabin) && "\u{1F436}", hasSauna(cabin) && "\u{1F9D6}", /* @__PURE__ */ React.createElement("img", {
    src: `${DAYSOFF_BASEURL}${cabin.images[0]}`,
    alt: ""
  }), /* @__PURE__ */ React.createElement("details", null, /* @__PURE__ */ React.createElement("summary", null, "Beskrivelse"), /* @__PURE__ */ React.createElement("p", {
    dangerouslySetInnerHTML: { __html: cabin.description }
  })));
};
var CabinCard_default = CabinCard;

// app/components/CabinTable.tsx
init_react();
var import_react2 = __toESM(require("react"));
var CabinTable = ({ cabins: cabinsRaw }) => {
  const [sortState, setSortState] = import_react2.default.useState({
    name: "Lokasjon",
    dir: ""
  });
  const toggleSortState = (name) => setSortState((current) => {
    if (name !== current.name)
      return { name, dir: "\u{1F53C}" };
    else if (current.dir === "")
      return { name, dir: "\u{1F53C}" };
    else if (current.dir === "\u{1F53C}")
      return { name, dir: "\u{1F53D}" };
    else
      return { name, dir: "\u{1F53C}" };
  });
  const cabins = cabinsRaw.map(preparedCabin);
  if (sortState.dir !== "") {
    const x = (cabin) => {
      if (sortState.name === "Lokasjon")
        return cabin.locationName;
      if (sortState.name === "Soverom")
        return cabin.bedrooms;
      if (sortState.name === "Hunder")
        return cabin.allowsDogs;
      if (sortState.name === "Internett")
        return cabin.hasInternet;
      if (sortState.name === "Badstue")
        return cabin.hasSauna;
      if (sortState.name === "Boblebad")
        return cabin.hasHottub;
      throw new Error(`unhandled sort ${sortState.name}`);
    };
    cabins.sort((a, b) => {
      if (x(a) < x(b)) {
        return sortState.dir === "\u{1F53C}" ? -1 : 1;
      }
      if (x(a) > x(b)) {
        return sortState.dir === "\u{1F53C}" ? 1 : -1;
      }
      return 0;
    });
  }
  const Th = (name) => /* @__PURE__ */ import_react2.default.createElement("th", {
    scope: "col",
    onClick: () => toggleSortState(name)
  }, name, " ", name === sortState.name && sortState.dir);
  return /* @__PURE__ */ import_react2.default.createElement("figure", null, /* @__PURE__ */ import_react2.default.createElement("table", null, /* @__PURE__ */ import_react2.default.createElement("thead", null, /* @__PURE__ */ import_react2.default.createElement("tr", null, Th("Lokasjon"), Th("Soverom"), Th("Hunder"), Th("Internett"), Th("Badstue"), Th("Boblebad"))), /* @__PURE__ */ import_react2.default.createElement("tbody", null, cabins.map((cabin) => /* @__PURE__ */ import_react2.default.createElement("tr", {
    key: cabin.link
  }, /* @__PURE__ */ import_react2.default.createElement("td", null, /* @__PURE__ */ import_react2.default.createElement("a", {
    href: `${DAYSOFF_BASEURL}${cabin.link}`,
    target: "_blank"
  }, cabin.locationName, " \u2197")), /* @__PURE__ */ import_react2.default.createElement("td", null, cabin.bedrooms), /* @__PURE__ */ import_react2.default.createElement("td", null, cabin.allowsDogs ? "\u{1F436}" : "-"), /* @__PURE__ */ import_react2.default.createElement("td", null, cabin.hasInternet ? "\u{1F310}" : "-"), /* @__PURE__ */ import_react2.default.createElement("td", null, cabin.hasSauna ? "\u{1F9D6}" : "-"), /* @__PURE__ */ import_react2.default.createElement("td", null, cabin.hasHottub ? "\u2668\uFE0F" : "-"))))));
};
var CabinTable_default = CabinTable;

// route:/Users/julianjark/personlig/daysoff-ui/app/routes/index.tsx
var loader = async () => {
  let mountainCabins;
  mountainCabins = await fetchCabinsForCategory(1 /* Mountain */);
  return (0, import_remix3.json)(mountainCabins);
};
function Index() {
  const cabins = (0, import_remix3.useLoaderData)();
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("header", {
    className: "container"
  }, /* @__PURE__ */ React.createElement("h1", null, "Bedre daysoff visning")), /* @__PURE__ */ React.createElement("main", {
    className: "container"
  }, /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement("fieldset", {
    onChange: (e) => console.log({ e: e.target })
  }, /* @__PURE__ */ React.createElement("legend", null, /* @__PURE__ */ React.createElement("strong", null, "Filtrer hytter")), /* @__PURE__ */ React.createElement("label", null, /* @__PURE__ */ React.createElement("input", {
    role: "switch",
    type: "checkbox",
    name: "allowDogs"
  }), "Hunder \u{1F436}"), /* @__PURE__ */ React.createElement("label", null, /* @__PURE__ */ React.createElement("input", {
    role: "switch",
    type: "checkbox",
    name: "hasInternet"
  }), "Internett \u{1F310}"), /* @__PURE__ */ React.createElement("label", null, /* @__PURE__ */ React.createElement("input", {
    role: "switch",
    type: "checkbox",
    name: "hasSauna"
  }), "Badstue \u{1F9D6}"), /* @__PURE__ */ React.createElement("label", null, /* @__PURE__ */ React.createElement("input", {
    role: "switch",
    type: "checkbox",
    name: "hasHottub"
  }), "Boblebad \u2668\uFE0F"))), "Count: ", cabins.length, /* @__PURE__ */ React.createElement("br", null), "Count allow dogs: ", cabins.filter((cabin) => allowsDogs(cabin)).length, /* @__PURE__ */ React.createElement(CabinTable_default, {
    cabins
  }), cabins.map((cabin) => /* @__PURE__ */ React.createElement(CabinCard_default, {
    key: cabin.link,
    cabin
  })), /* @__PURE__ */ React.createElement(DebugData_default, {
    data: cabins
  })));
}

// server-assets-manifest:@remix-run/dev/assets-manifest
init_react();
var assets_manifest_default = { "version": "853ccd33", "entry": { "module": "/build/entry.client-UBV4BV7O.js", "imports": ["/build/_shared/chunk-ESOVAO67.js"] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "module": "/build/root-5GP2O2XQ.js", "imports": void 0, "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/index": { "id": "routes/index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "module": "/build/routes/index-BRV5JCQ2.js", "imports": void 0, "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false } }, "url": "/build/manifest-853CCD33.js" };

// server-entry-module:@remix-run/dev/server-build
var entry = { module: entry_server_exports };
var routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/index": {
    id: "routes/index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: routes_exports
  }
};
module.exports = __toCommonJS(stdin_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assets,
  entry,
  routes
});
/**
 * @remix-run/node v1.2.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
/**
 * @remix-run/react v1.2.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
/**
 * @remix-run/server-runtime v1.2.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vbm9kZV9tb2R1bGVzL0ByZW1peC1ydW4vZGV2L2NvbXBpbGVyL3NoaW1zL3JlYWN0LnRzIiwgIi4uL25vZGVfbW9kdWxlcy9yZW1peC9pbmRleC5qcyIsICI8c3RkaW4+IiwgInNlcnZlci1lbnRyeS1tb2R1bGU6QHJlbWl4LXJ1bi9kZXYvc2VydmVyLWJ1aWxkIiwgIi4uL2FwcC9lbnRyeS5zZXJ2ZXIudHN4IiwgInJvdXRlOi9Vc2Vycy9qdWxpYW5qYXJrL3BlcnNvbmxpZy9kYXlzb2ZmLXVpL2FwcC9yb290LnRzeCIsICJyb3V0ZTovVXNlcnMvanVsaWFuamFyay9wZXJzb25saWcvZGF5c29mZi11aS9hcHAvcm91dGVzL2luZGV4LnRzeCIsICIuLi9hcHAvZGF5c29mZkNsaWVudC50cyIsICIuLi9hcHAvZG9tYWluLnRzIiwgIi4uL2FwcC9jb21wb25lbnRzL0RlYnVnRGF0YS50c3giLCAiLi4vYXBwL2NvbXBvbmVudHMvQ2FiaW5DYXJkLnRzeCIsICIuLi9hcHAvY29tcG9uZW50cy9DYWJpblRhYmxlLnRzeCIsICJzZXJ2ZXItYXNzZXRzLW1hbmlmZXN0OkByZW1peC1ydW4vZGV2L2Fzc2V0cy1tYW5pZmVzdCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5leHBvcnQgeyBSZWFjdCB9O1xuIiwgIi8qKlxuICogQHJlbWl4LXJ1bi9ub2RlIHYxLjIuM1xuICpcbiAqIENvcHlyaWdodCAoYykgUmVtaXggU29mdHdhcmUgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRS5tZCBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqIEBsaWNlbnNlIE1JVFxuICovXG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5cbnZhciBub2RlID0gcmVxdWlyZSgnQHJlbWl4LXJ1bi9ub2RlJyk7XG5cblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ2NyZWF0ZUZpbGVTZXNzaW9uU3RvcmFnZScsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBub2RlLmNyZWF0ZUZpbGVTZXNzaW9uU3RvcmFnZTsgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ3Vuc3RhYmxlX2NyZWF0ZUZpbGVVcGxvYWRIYW5kbGVyJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5vZGUudW5zdGFibGVfY3JlYXRlRmlsZVVwbG9hZEhhbmRsZXI7IH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICd1bnN0YWJsZV9jcmVhdGVNZW1vcnlVcGxvYWRIYW5kbGVyJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5vZGUudW5zdGFibGVfY3JlYXRlTWVtb3J5VXBsb2FkSGFuZGxlcjsgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ3Vuc3RhYmxlX3BhcnNlTXVsdGlwYXJ0Rm9ybURhdGEnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gbm9kZS51bnN0YWJsZV9wYXJzZU11bHRpcGFydEZvcm1EYXRhOyB9XG59KTtcblxuLyoqXG4gKiBAcmVtaXgtcnVuL3NlcnZlci1ydW50aW1lIHYxLjIuM1xuICpcbiAqIENvcHlyaWdodCAoYykgUmVtaXggU29mdHdhcmUgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRS5tZCBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqIEBsaWNlbnNlIE1JVFxuICovXG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5cbnZhciBzZXJ2ZXJSdW50aW1lID0gcmVxdWlyZSgnQHJlbWl4LXJ1bi9zZXJ2ZXItcnVudGltZScpO1xuXG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdjcmVhdGVDb29raWUnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc2VydmVyUnVudGltZS5jcmVhdGVDb29raWU7IH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdjcmVhdGVDb29raWVTZXNzaW9uU3RvcmFnZScsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBzZXJ2ZXJSdW50aW1lLmNyZWF0ZUNvb2tpZVNlc3Npb25TdG9yYWdlOyB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnY3JlYXRlTWVtb3J5U2Vzc2lvblN0b3JhZ2UnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc2VydmVyUnVudGltZS5jcmVhdGVNZW1vcnlTZXNzaW9uU3RvcmFnZTsgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ2NyZWF0ZVNlc3Npb24nLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc2VydmVyUnVudGltZS5jcmVhdGVTZXNzaW9uOyB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnY3JlYXRlU2Vzc2lvblN0b3JhZ2UnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc2VydmVyUnVudGltZS5jcmVhdGVTZXNzaW9uU3RvcmFnZTsgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ2lzQ29va2llJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNlcnZlclJ1bnRpbWUuaXNDb29raWU7IH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdpc1Nlc3Npb24nLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc2VydmVyUnVudGltZS5pc1Nlc3Npb247IH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdqc29uJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNlcnZlclJ1bnRpbWUuanNvbjsgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ3JlZGlyZWN0Jywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNlcnZlclJ1bnRpbWUucmVkaXJlY3Q7IH1cbn0pO1xuXG4vKipcbiAqIEByZW1peC1ydW4vcmVhY3QgdjEuMi4zXG4gKlxuICogQ29weXJpZ2h0IChjKSBSZW1peCBTb2Z0d2FyZSBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFLm1kIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICogQGxpY2Vuc2UgTUlUXG4gKi9cbid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcblxudmFyIHJlYWN0ID0gcmVxdWlyZSgnQHJlbWl4LXJ1bi9yZWFjdCcpO1xuXG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdGb3JtJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJlYWN0LkZvcm07IH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdMaW5rJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJlYWN0Lkxpbms7IH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdMaW5rcycsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiByZWFjdC5MaW5rczsgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ0xpdmVSZWxvYWQnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcmVhY3QuTGl2ZVJlbG9hZDsgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ01ldGEnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcmVhY3QuTWV0YTsgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ05hdkxpbmsnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcmVhY3QuTmF2TGluazsgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ091dGxldCcsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiByZWFjdC5PdXRsZXQ7IH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdQcmVmZXRjaFBhZ2VMaW5rcycsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiByZWFjdC5QcmVmZXRjaFBhZ2VMaW5rczsgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ1JlbWl4QnJvd3NlcicsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiByZWFjdC5SZW1peEJyb3dzZXI7IH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdSZW1peFNlcnZlcicsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiByZWFjdC5SZW1peFNlcnZlcjsgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ1NjcmlwdHMnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcmVhY3QuU2NyaXB0czsgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ1Njcm9sbFJlc3RvcmF0aW9uJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJlYWN0LlNjcm9sbFJlc3RvcmF0aW9uOyB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAndXNlQWN0aW9uRGF0YScsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiByZWFjdC51c2VBY3Rpb25EYXRhOyB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAndXNlQmVmb3JlVW5sb2FkJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJlYWN0LnVzZUJlZm9yZVVubG9hZDsgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ3VzZUNhdGNoJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJlYWN0LnVzZUNhdGNoOyB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAndXNlRmV0Y2hlcicsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiByZWFjdC51c2VGZXRjaGVyOyB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAndXNlRmV0Y2hlcnMnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcmVhY3QudXNlRmV0Y2hlcnM7IH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICd1c2VGb3JtQWN0aW9uJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJlYWN0LnVzZUZvcm1BY3Rpb247IH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICd1c2VIcmVmJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJlYWN0LnVzZUhyZWY7IH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICd1c2VMb2FkZXJEYXRhJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJlYWN0LnVzZUxvYWRlckRhdGE7IH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICd1c2VMb2NhdGlvbicsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiByZWFjdC51c2VMb2NhdGlvbjsgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ3VzZU1hdGNoZXMnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcmVhY3QudXNlTWF0Y2hlczsgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ3VzZU5hdmlnYXRlJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJlYWN0LnVzZU5hdmlnYXRlOyB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAndXNlTmF2aWdhdGlvblR5cGUnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcmVhY3QudXNlTmF2aWdhdGlvblR5cGU7IH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICd1c2VPdXRsZXQnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcmVhY3QudXNlT3V0bGV0OyB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAndXNlT3V0bGV0Q29udGV4dCcsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiByZWFjdC51c2VPdXRsZXRDb250ZXh0OyB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAndXNlUGFyYW1zJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJlYWN0LnVzZVBhcmFtczsgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ3VzZVJlc29sdmVkUGF0aCcsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiByZWFjdC51c2VSZXNvbHZlZFBhdGg7IH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICd1c2VTZWFyY2hQYXJhbXMnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcmVhY3QudXNlU2VhcmNoUGFyYW1zOyB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAndXNlU3VibWl0Jywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJlYWN0LnVzZVN1Ym1pdDsgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ3VzZVRyYW5zaXRpb24nLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcmVhY3QudXNlVHJhbnNpdGlvbjsgfVxufSk7XG5cbiIsICJleHBvcnQgKiBmcm9tIFwiQHJlbWl4LXJ1bi9kZXYvc2VydmVyLWJ1aWxkXCI7IiwgIlxuaW1wb3J0ICogYXMgZW50cnlTZXJ2ZXIgZnJvbSBcIi9Vc2Vycy9qdWxpYW5qYXJrL3BlcnNvbmxpZy9kYXlzb2ZmLXVpL2FwcC9lbnRyeS5zZXJ2ZXIudHN4XCI7XG5pbXBvcnQgKiBhcyByb3V0ZTAgZnJvbSBcIi9Vc2Vycy9qdWxpYW5qYXJrL3BlcnNvbmxpZy9kYXlzb2ZmLXVpL2FwcC9yb290LnRzeFwiO1xuaW1wb3J0ICogYXMgcm91dGUxIGZyb20gXCIvVXNlcnMvanVsaWFuamFyay9wZXJzb25saWcvZGF5c29mZi11aS9hcHAvcm91dGVzL2luZGV4LnRzeFwiO1xuICBleHBvcnQgeyBkZWZhdWx0IGFzIGFzc2V0cyB9IGZyb20gXCJAcmVtaXgtcnVuL2Rldi9hc3NldHMtbWFuaWZlc3RcIjtcbiAgZXhwb3J0IGNvbnN0IGVudHJ5ID0geyBtb2R1bGU6IGVudHJ5U2VydmVyIH07XG4gIGV4cG9ydCBjb25zdCByb3V0ZXMgPSB7XG4gICAgXCJyb290XCI6IHtcbiAgICAgIGlkOiBcInJvb3RcIixcbiAgICAgIHBhcmVudElkOiB1bmRlZmluZWQsXG4gICAgICBwYXRoOiBcIlwiLFxuICAgICAgaW5kZXg6IHVuZGVmaW5lZCxcbiAgICAgIGNhc2VTZW5zaXRpdmU6IHVuZGVmaW5lZCxcbiAgICAgIG1vZHVsZTogcm91dGUwXG4gICAgfSxcbiAgXCJyb3V0ZXMvaW5kZXhcIjoge1xuICAgICAgaWQ6IFwicm91dGVzL2luZGV4XCIsXG4gICAgICBwYXJlbnRJZDogXCJyb290XCIsXG4gICAgICBwYXRoOiB1bmRlZmluZWQsXG4gICAgICBpbmRleDogdHJ1ZSxcbiAgICAgIGNhc2VTZW5zaXRpdmU6IHVuZGVmaW5lZCxcbiAgICAgIG1vZHVsZTogcm91dGUxXG4gICAgfVxuICB9OyIsICJpbXBvcnQgeyByZW5kZXJUb1N0cmluZyB9IGZyb20gXCJyZWFjdC1kb20vc2VydmVyXCI7XG5pbXBvcnQgeyBSZW1peFNlcnZlciB9IGZyb20gXCJyZW1peFwiO1xuaW1wb3J0IHR5cGUgeyBFbnRyeUNvbnRleHQgfSBmcm9tIFwicmVtaXhcIjtcblxuY29uc3QgZG90ZW52ID0gcmVxdWlyZShcImRvdGVudlwiKTtcbmRvdGVudi5jb25maWcoKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaGFuZGxlUmVxdWVzdChcbiAgcmVxdWVzdDogUmVxdWVzdCxcbiAgcmVzcG9uc2VTdGF0dXNDb2RlOiBudW1iZXIsXG4gIHJlc3BvbnNlSGVhZGVyczogSGVhZGVycyxcbiAgcmVtaXhDb250ZXh0OiBFbnRyeUNvbnRleHRcbikge1xuICBjb25zdCBtYXJrdXAgPSByZW5kZXJUb1N0cmluZyhcbiAgICA8UmVtaXhTZXJ2ZXIgY29udGV4dD17cmVtaXhDb250ZXh0fSB1cmw9e3JlcXVlc3QudXJsfSAvPlxuICApO1xuXG4gIHJlc3BvbnNlSGVhZGVycy5zZXQoXCJDb250ZW50LVR5cGVcIiwgXCJ0ZXh0L2h0bWxcIik7XG5cbiAgcmV0dXJuIG5ldyBSZXNwb25zZShcIjwhRE9DVFlQRSBodG1sPlwiICsgbWFya3VwLCB7XG4gICAgc3RhdHVzOiByZXNwb25zZVN0YXR1c0NvZGUsXG4gICAgaGVhZGVyczogcmVzcG9uc2VIZWFkZXJzLFxuICB9KTtcbn1cbiIsICJpbXBvcnQge1xuICBMaW5rcyxcbiAgTGl2ZVJlbG9hZCxcbiAgTWV0YSxcbiAgT3V0bGV0LFxuICBTY3JpcHRzLFxuICBTY3JvbGxSZXN0b3JhdGlvbixcbn0gZnJvbSBcInJlbWl4XCI7XG5pbXBvcnQgdHlwZSB7IE1ldGFGdW5jdGlvbiB9IGZyb20gXCJyZW1peFwiO1xuXG5leHBvcnQgY29uc3QgbWV0YTogTWV0YUZ1bmN0aW9uID0gKCkgPT4ge1xuICByZXR1cm4geyB0aXRsZTogXCJEYXlzb2ZmIFVJXCIgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEFwcCgpIHtcbiAgcmV0dXJuIChcbiAgICA8aHRtbCBsYW5nPVwiZW5cIj5cbiAgICAgIDxoZWFkPlxuICAgICAgICA8bWV0YSBjaGFyU2V0PVwidXRmLThcIiAvPlxuICAgICAgICA8bWV0YSBuYW1lPVwidmlld3BvcnRcIiBjb250ZW50PVwid2lkdGg9ZGV2aWNlLXdpZHRoLGluaXRpYWwtc2NhbGU9MVwiIC8+XG4gICAgICAgIDxsaW5rXG4gICAgICAgICAgcmVsPVwic3R5bGVzaGVldFwiXG4gICAgICAgICAgaHJlZj1cImh0dHBzOi8vdW5wa2cuY29tL0BwaWNvY3NzL3BpY29AbGF0ZXN0L2Nzcy9waWNvLm1pbi5jc3NcIlxuICAgICAgICAvPlxuICAgICAgICA8TWV0YSAvPlxuICAgICAgICA8TGlua3MgLz5cbiAgICAgIDwvaGVhZD5cbiAgICAgIDxib2R5PlxuICAgICAgICA8T3V0bGV0IC8+XG4gICAgICAgIDxTY3JvbGxSZXN0b3JhdGlvbiAvPlxuICAgICAgICA8U2NyaXB0cyAvPlxuICAgICAgICA8TGl2ZVJlbG9hZCAvPlxuICAgICAgPC9ib2R5PlxuICAgIDwvaHRtbD5cbiAgKTtcbn1cbiIsICJpbXBvcnQgeyBqc29uLCBMb2FkZXJGdW5jdGlvbiwgdXNlTG9hZGVyRGF0YSB9IGZyb20gXCJyZW1peFwiO1xuaW1wb3J0IHsgZmV0Y2hDYWJpbnNGb3JDYXRlZ29yeSwgbG9naW4gfSBmcm9tIFwifi9kYXlzb2ZmQ2xpZW50XCI7XG5pbXBvcnQgeyBhbGxvd3NEb2dzLCBDYWJpbkRldGFpbGVkLCBDYXRlZ29yeSB9IGZyb20gXCJ+L2RvbWFpblwiO1xuaW1wb3J0IERlYnVnRGF0YSBmcm9tIFwifi9jb21wb25lbnRzL0RlYnVnRGF0YVwiO1xuaW1wb3J0IENhYmluQ2FyZCBmcm9tIFwifi9jb21wb25lbnRzL0NhYmluQ2FyZFwiO1xuaW1wb3J0IENhYmluVGFibGUgZnJvbSBcIn4vY29tcG9uZW50cy9DYWJpblRhYmxlXCI7XG5cbmV4cG9ydCBjb25zdCBsb2FkZXI6IExvYWRlckZ1bmN0aW9uID0gYXN5bmMgKCkgPT4ge1xuICBsZXQgbW91bnRhaW5DYWJpbnM6IENhYmluRGV0YWlsZWRbXTtcbiAgbW91bnRhaW5DYWJpbnMgPSBhd2FpdCBmZXRjaENhYmluc0ZvckNhdGVnb3J5KENhdGVnb3J5Lk1vdW50YWluKTtcbiAgcmV0dXJuIGpzb24obW91bnRhaW5DYWJpbnMpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gSW5kZXgoKSB7XG4gIGNvbnN0IGNhYmlucyA9IHVzZUxvYWRlckRhdGE8Q2FiaW5EZXRhaWxlZFtdPigpO1xuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxoZWFkZXIgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XG4gICAgICAgIDxoMT5CZWRyZSBkYXlzb2ZmIHZpc25pbmc8L2gxPlxuICAgICAgPC9oZWFkZXI+XG4gICAgICA8bWFpbiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cbiAgICAgICAgPHNlY3Rpb24+XG4gICAgICAgICAgPGZpZWxkc2V0IG9uQ2hhbmdlPXsoZSkgPT4gY29uc29sZS5sb2coeyBlOiBlLnRhcmdldCB9KX0+XG4gICAgICAgICAgICA8bGVnZW5kPlxuICAgICAgICAgICAgICA8c3Ryb25nPkZpbHRyZXIgaHl0dGVyPC9zdHJvbmc+XG4gICAgICAgICAgICA8L2xlZ2VuZD5cbiAgICAgICAgICAgIDxsYWJlbD5cbiAgICAgICAgICAgICAgPGlucHV0IHJvbGU9XCJzd2l0Y2hcIiB0eXBlPVwiY2hlY2tib3hcIiBuYW1lPVwiYWxsb3dEb2dzXCIgLz5cbiAgICAgICAgICAgICAgSHVuZGVyIFx1RDgzRFx1REMzNlxuICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgIDxsYWJlbD5cbiAgICAgICAgICAgICAgPGlucHV0IHJvbGU9XCJzd2l0Y2hcIiB0eXBlPVwiY2hlY2tib3hcIiBuYW1lPVwiaGFzSW50ZXJuZXRcIiAvPlxuICAgICAgICAgICAgICBJbnRlcm5ldHQgXHVEODNDXHVERjEwXG4gICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgPGxhYmVsPlxuICAgICAgICAgICAgICA8aW5wdXQgcm9sZT1cInN3aXRjaFwiIHR5cGU9XCJjaGVja2JveFwiIG5hbWU9XCJoYXNTYXVuYVwiIC8+XG4gICAgICAgICAgICAgIEJhZHN0dWUgXHVEODNFXHVEREQ2XG4gICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgPGxhYmVsPlxuICAgICAgICAgICAgICA8aW5wdXQgcm9sZT1cInN3aXRjaFwiIHR5cGU9XCJjaGVja2JveFwiIG5hbWU9XCJoYXNIb3R0dWJcIiAvPlxuICAgICAgICAgICAgICBCb2JsZWJhZCBcdTI2NjhcdUZFMEZcbiAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgPC9maWVsZHNldD5cbiAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICBDb3VudDoge2NhYmlucy5sZW5ndGh9XG4gICAgICAgIDxiciAvPlxuICAgICAgICBDb3VudCBhbGxvdyBkb2dzOiB7Y2FiaW5zLmZpbHRlcigoY2FiaW4pID0+IGFsbG93c0RvZ3MoY2FiaW4pKS5sZW5ndGh9XG4gICAgICAgIDxDYWJpblRhYmxlIGNhYmlucz17Y2FiaW5zfSAvPlxuICAgICAgICB7Y2FiaW5zLm1hcCgoY2FiaW4pID0+IChcbiAgICAgICAgICA8Q2FiaW5DYXJkIGtleT17Y2FiaW4ubGlua30gY2FiaW49e2NhYmlufSAvPlxuICAgICAgICApKX1cbiAgICAgICAgPERlYnVnRGF0YSBkYXRhPXtjYWJpbnN9IC8+XG4gICAgICA8L21haW4+XG4gICAgPC8+XG4gICk7XG59XG4iLCAiaW1wb3J0IGF4aW9zIGZyb20gXCJheGlvc1wiO1xuaW1wb3J0IHsgd3JhcHBlciB9IGZyb20gXCJheGlvcy1jb29raWVqYXItc3VwcG9ydFwiO1xuaW1wb3J0IHsgQ29va2llSmFyIH0gZnJvbSBcInRvdWdoLWNvb2tpZVwiO1xuaW1wb3J0IHsgbG9hZCB9IGZyb20gXCJjaGVlcmlvXCI7XG5pbXBvcnQgUmVkaXMgZnJvbSBcImlvcmVkaXNcIjtcbmltcG9ydCB7XG4gIENhYmluRGV0YWlsZWQsXG4gIENhYmluU2ltcGxlLFxuICBDYXRlZ29yeSxcbiAgREFZU09GRl9CQVNFVVJMLFxufSBmcm9tIFwiLi9kb21haW5cIjtcblxuY29uc3QgcmVkaXNDbGllbnQgPSBuZXcgUmVkaXMocHJvY2Vzcy5lbnYuUkVESVNfVVJMKTtcblxuY29uc3QgY2FjaGUgPSByZWRpc0NsaWVudDtcbmNvbnN0IGphciA9IG5ldyBDb29raWVKYXIoKTtcbmNvbnN0IGNsaWVudCA9IHdyYXBwZXIoYXhpb3MuY3JlYXRlKHsgamFyIH0pKTtcblxuY29uc3QgZmV0Y2hUb2tlbiA9IGFzeW5jICgpID0+IHtcbiAgY29uc3QgcGFyc2VUb2tlbiA9IChkYXRhOiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCAkID0gbG9hZChkYXRhKTtcbiAgICBjb25zdCB0b2tlbiA9ICQoXCJmb3JtIGlucHV0W25hbWU9X3Rva2VuXVwiKS5maXJzdCgpLmF0dHIoXCJ2YWx1ZVwiKTtcbiAgICBpZiAodG9rZW4gPT09IHVuZGVmaW5lZCkgdGhyb3cgbmV3IEVycm9yKFwiY291bGQgbm90IGZldGNoIHRva2VuXCIpO1xuICAgIHJldHVybiB0b2tlbjtcbiAgfTtcbiAgY29uc3QgaHRtbCA9IGF3YWl0IGNsaWVudC5nZXQoYCR7REFZU09GRl9CQVNFVVJMfS9gKTtcbiAgcmV0dXJuIHBhcnNlVG9rZW4oaHRtbC5kYXRhKTtcbn07XG5leHBvcnQgY29uc3QgbG9naW4gPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IHRva2VuID0gYXdhaXQgZmV0Y2hUb2tlbigpO1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNsaWVudC5wb3N0KFxuICAgIGAke0RBWVNPRkZfQkFTRVVSTH0vY2hlY2tgLFxuICAgIG5ldyBVUkxTZWFyY2hQYXJhbXMoe1xuICAgICAgX3Rva2VuOiB0b2tlbixcbiAgICAgIGVtYWlsOiBwcm9jZXNzLmVudi5EQVlTT0ZGX0VNQUlMISxcbiAgICAgIHBhc3N3b3JkOiBwcm9jZXNzLmVudi5EQVlTT0ZGX1BBU1NXT1JEISxcbiAgICB9KVxuICApO1xuICByZXR1cm4ge1xuICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IGZldGNoQ2FiaW5zU2ltcGxlID0gYXN5bmMgKFxuICBjYXRlZ29yeTogQ2F0ZWdvcnlcbik6IFByb21pc2U8Q2FiaW5TaW1wbGVbXT4gPT4ge1xuICBjb25zdCBjYWNoZWQgPSBhd2FpdCBjYWNoZS5oZ2V0KFwiY2FiaW5zU2ltcGxlXCIsIFN0cmluZyhjYXRlZ29yeSkpO1xuICBpZiAoY2FjaGVkICE9PSBudWxsKSB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UoY2FjaGVkISkgYXMgQ2FiaW5TaW1wbGVbXTtcbiAgfVxuXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgY2xpZW50LmdldChcbiAgICBgJHtEQVlTT0ZGX0JBU0VVUkx9L3Jlc3VsdGF0ZXI/Y2F0PSR7Y2F0ZWdvcnl9YFxuICApO1xuICBjb25zdCAkID0gbG9hZChyZXNwb25zZS5kYXRhKTtcbiAgY29uc3QgY2FiaW5zUmF3ID0gJChcImEuc2VhcmNoLXJlc3VsdHMtLWxpc3RpbmdzLS1pdGVtc19faXRlbVwiKS5nZXQoKTtcbiAgaWYgKGNhYmluc1Jhdy5sZW5ndGggPT09IDApIHRocm93IG5ldyBFcnJvcihcIkNvdWxkIG5vdCBmZXRjaCBjYWJpbnNcIik7XG5cbiAgY29uc3QgY2FiaW5zID0gY2FiaW5zUmF3Lm1hcCgoZSkgPT4gKHtcbiAgICBsaW5rOiBlLmF0dHJpYnMuaHJlZixcbiAgICB0aXRsZTogZS5hdHRyaWJzLnRpdGxlLFxuICAgIGltYWdlOiAkKGUpLmZpbmQoXCJpbWdcIikuZmlyc3QoKS5hdHRyKFwic3JjXCIpISxcbiAgfSkpO1xuXG4gIGF3YWl0IGNhY2hlLmhzZXQoXCJjYWJpbnNTaW1wbGVcIiwgU3RyaW5nKGNhdGVnb3J5KSwgSlNPTi5zdHJpbmdpZnkoY2FiaW5zKSk7XG4gIHJldHVybiBjYWJpbnM7XG59O1xuXG5leHBvcnQgY29uc3QgZmV0Y2hDYWJpbkRldGFpbGVkID0gYXN5bmMgKFxuICBjYWJpblNpbXBsZTogQ2FiaW5TaW1wbGVcbik6IFByb21pc2U8Q2FiaW5EZXRhaWxlZD4gPT4ge1xuICBjb25zdCBjYWNoZWQgPSBhd2FpdCBjYWNoZS5oZ2V0KFwiY2FiaW5zXCIsIGNhYmluU2ltcGxlLmxpbmspO1xuICBpZiAoY2FjaGVkICE9PSBudWxsKSB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UoY2FjaGVkISkgYXMgQ2FiaW5EZXRhaWxlZDtcbiAgfVxuXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgY2xpZW50LmdldChgJHtEQVlTT0ZGX0JBU0VVUkx9JHtjYWJpblNpbXBsZS5saW5rfWApO1xuICBjb25zdCAkID0gbG9hZChyZXNwb25zZS5kYXRhKTtcbiAgaWYgKCQoXCIub2JqZWN0LS1zcGVjaWZpY2F0aW9uc19faXRlbVwiKS5sZW5ndGggPT09IDApXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGQgbm90IGZldGNoIGNhYmluIGRldGFpbHNcIik7XG5cbiAgY29uc3QgbG9jYXRpb25NYXRjaCA9IHJlc3BvbnNlLmRhdGEubWF0Y2goXG4gICAgL25ldyBnb29nbGUubWFwcy5MYXRMbmdcXCgoLispLCAoLispXFwpOy9cbiAgKTtcbiAgY29uc3QgbGF0ID0gbG9jYXRpb25NYXRjaFsxXTtcbiAgY29uc3QgbG5nID0gbG9jYXRpb25NYXRjaFsyXTtcblxuICBjb25zdCBjYWJpbkRldGFpbGVkID0ge1xuICAgIGxpbms6IGNhYmluU2ltcGxlLmxpbmssXG4gICAgdGl0bGU6ICQoXCJoMVwiKS50ZXh0KCksXG4gICAgaW1hZ2VzOiAkKFwiLmltYWdlX2xpZ2h0Ym94LS1pbWFnZXMtLWl0ZW1cIilcbiAgICAgIC5nZXQoKVxuICAgICAgLm1hcCgoZSkgPT4gJChlKS5maW5kKFwiaW1nXCIpLmF0dHIoXCJzcmNcIikhKSxcbiAgICBzcGVjaWZpY2F0aW9uczogJChcIi5vYmplY3QtLXNwZWNpZmljYXRpb25zX19pdGVtXCIpXG4gICAgICAuZ2V0KClcbiAgICAgIC5tYXAoKGUpID0+ICh7XG4gICAgICAgIFskKGUpLmZpbmQoXCIuc3BlY2lmaWNhdGlvbi1sYWJlbFwiKS50ZXh0KCldOiAkKGUpXG4gICAgICAgICAgLmZpbmQoXCIuc3BlY2lmaWNhdGlvbi1jb250ZW50XCIpXG4gICAgICAgICAgLnRleHQoKSxcbiAgICAgIH0pKVxuICAgICAgLnJlZHVjZSgoYWNjLCB4KSA9PiAoeyAuLi5hY2MsIC4uLnggfSksIHt9KSxcbiAgICBkZXNjcmlwdGlvbjogJChcIi5vYmplY3QtLWRlc2NyaXB0aW9uID4gLmNvbHVtblwiKS5odG1sKCkhLnRyaW0oKSxcbiAgICBydWxlczogJChcIi5vYmplY3QtLXJ1bGVzX19jb250ZW50X19jb250ZW50XCIpXG4gICAgICAuZ2V0KClcbiAgICAgIC5tYXAoKGUpID0+ICh7XG4gICAgICAgIFskKGUpLmZpbmQoXCJoMlwiKS50ZXh0KCldOiAkKGUpXG4gICAgICAgICAgLmh0bWwoKSFcbiAgICAgICAgICAucmVwbGFjZSgvXFw8aDJcXD4uK1xcPFxcL2gyXFw+LywgXCJcIilcbiAgICAgICAgICAudHJpbSgpLFxuICAgICAgfSkpXG4gICAgICAucmVkdWNlKChhY2MsIHgpID0+ICh7IC4uLmFjYywgLi4ueCB9KSwge30pLFxuICAgIGZhY2lsaXRpZXM6ICQoXCIub2JqZWN0LS1mYWNpbGl0aWVzX19saXN0LS1pdGVtXCIpXG4gICAgICAuZ2V0KClcbiAgICAgIC5tYXAoKGUpID0+ICQoZSkudGV4dCgpLnRyaW0oKSksXG4gICAgbG9jYXRpb246IHsgbGF0LCBsbmcgfSxcbiAgICBjbG9zZWJ5OiAkKFwiLm9iamVjdC0tY2xvc2VieV9fd3JhcF9faXRlbS0tY29udGVudFwiKVxuICAgICAgLmdldCgpXG4gICAgICAubWFwKChlKSA9PiAkKGUpLmZpbmQoXCJoM1wiKS50ZXh0KCkudHJpbSgpKSxcbiAgfTtcblxuICBhd2FpdCBjYWNoZS5oc2V0KFwiY2FiaW5zXCIsIGNhYmluU2ltcGxlLmxpbmssIEpTT04uc3RyaW5naWZ5KGNhYmluRGV0YWlsZWQpKTtcbiAgcmV0dXJuIGNhYmluRGV0YWlsZWQ7XG59O1xuXG4vLyBIZWxwZXJcbmZ1bmN0aW9uIGNodW5rPFQ+KGFycmF5OiBUW10sIHNpemU6IG51bWJlcik6IFRbXVtdIHtcbiAgY29uc3QgY2h1bmtlZEFycmF5ID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpICs9IHNpemUpIHtcbiAgICBjaHVua2VkQXJyYXkucHVzaChhcnJheS5zbGljZShpLCBpICsgc2l6ZSkpO1xuICB9XG4gIHJldHVybiBjaHVua2VkQXJyYXk7XG59XG5cbmV4cG9ydCBjb25zdCBmZXRjaENhYmluc0ZvckNhdGVnb3J5ID0gYXN5bmMgKFxuICBjYXRlZ29yeTogQ2F0ZWdvcnksXG4gIHJldHJ5ID0gdHJ1ZVxuKTogUHJvbWlzZTxDYWJpbkRldGFpbGVkW10+ID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCBjYWJpbnNTaW1wbGUgPSBhd2FpdCBmZXRjaENhYmluc1NpbXBsZShjYXRlZ29yeSk7XG5cbiAgICBsZXQgY2FiaW5zRGV0YWlsZWQ6IENhYmluRGV0YWlsZWRbXSA9IFtdO1xuICAgIGZvciAobGV0IGNhYmlucyBvZiBjaHVuayhjYWJpbnNTaW1wbGUsIDMwKSkge1xuICAgICAgY29uc3QgcmVzID0gYXdhaXQgUHJvbWlzZS5hbGwoY2FiaW5zLm1hcChmZXRjaENhYmluRGV0YWlsZWQpKTtcbiAgICAgIGNhYmluc0RldGFpbGVkID0gY2FiaW5zRGV0YWlsZWQuY29uY2F0KHJlcyk7XG4gICAgfVxuICAgIHJldHVybiBjYWJpbnNEZXRhaWxlZDtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGlmICghcmV0cnkpIHRocm93IGU7XG4gICAgYXdhaXQgbG9naW4oKTtcbiAgICByZXR1cm4gYXdhaXQgZmV0Y2hDYWJpbnNGb3JDYXRlZ29yeShjYXRlZ29yeSk7XG4gIH1cbn07XG4iLCAiZXhwb3J0IGludGVyZmFjZSBMYXRMbmcge1xuICBsYXQ6IHN0cmluZztcbiAgbG5nOiBzdHJpbmc7XG59XG5leHBvcnQgZW51bSBDYXRlZ29yeSB7XG4gIE1vdW50YWluID0gMSxcbiAgT2NlYW4gPSAyLFxuICBBYnJvYWQgPSAzLFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIENhYmluU2ltcGxlIHtcbiAgbGluazogc3RyaW5nO1xuICB0aXRsZTogc3RyaW5nO1xuICBpbWFnZTogc3RyaW5nO1xufVxuZXhwb3J0IGludGVyZmFjZSBDYWJpbkRldGFpbGVkIHtcbiAgbGluazogc3RyaW5nO1xuICB0aXRsZTogc3RyaW5nO1xuICBpbWFnZXM6IHN0cmluZ1tdO1xuICBzcGVjaWZpY2F0aW9uczogUmVjb3JkPHN0cmluZywgc3RyaW5nPjtcbiAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgcnVsZXM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz47XG4gIGZhY2lsaXRpZXM6IHN0cmluZ1tdO1xuICBsb2NhdGlvbjogTGF0TG5nO1xuICBjbG9zZWJ5OiBzdHJpbmdbXTtcbn1cblxuLy8gRG9tYWluIGZ1bmN0aW9uc1xuZXhwb3J0IGNvbnN0IGFsbG93c0RvZ3MgPSAoY2FiaW46IENhYmluRGV0YWlsZWQpID0+XG4gIGNhYmluLnJ1bGVzLkh1c3JlZ2xlcj8uaW5jbHVkZXMoXCJUaWxsYXQgbWVkIGh1c2R5clwiKSAmJlxuICAhY2FiaW4ucnVsZXMuSHVzcmVnbGVyPy5pbmNsdWRlcyhcIklra2UgdGlsbGF0IG1lZCBodXNkeXJcIik7XG5cbmV4cG9ydCBjb25zdCBoYXNTYXVuYSA9IChjYWJpbjogQ2FiaW5EZXRhaWxlZCkgPT5cbiAgY2FiaW4uZmFjaWxpdGllcy5pbmNsdWRlcyhcIkJhZHN0dWVcIik7XG5cbmV4cG9ydCBjb25zdCBwcmVwYXJlZENhYmluID0gKGNhYmluOiBDYWJpbkRldGFpbGVkKSA9PiAoe1xuICAuLi5jYWJpbixcblxuICBnZXQgbG9jYXRpb25OYW1lKCkge1xuICAgIHJldHVybiBjYWJpbi5zcGVjaWZpY2F0aW9ucy5CZWxpZ2dlbmhldDtcbiAgfSxcbiAgZ2V0IGFsbG93c0RvZ3MoKSB7XG4gICAgcmV0dXJuIGFsbG93c0RvZ3MoY2FiaW4pO1xuICB9LFxuICBnZXQgaGFzSW50ZXJuZXQoKSB7XG4gICAgcmV0dXJuIGNhYmluLmZhY2lsaXRpZXMuaW5jbHVkZXMoXCJJbnRlcm5ldHRcIik7XG4gIH0sXG4gIGdldCBoYXNTYXVuYSgpIHtcbiAgICByZXR1cm4gaGFzU2F1bmEoY2FiaW4pO1xuICB9LFxuICBnZXQgaGFzSG90dHViKCkge1xuICAgIHJldHVybiBjYWJpbi5mYWNpbGl0aWVzLmluY2x1ZGVzKFwiQm9ibGViYWRcIik7XG4gIH0sXG4gIGdldCBiZWRyb29tcygpIHtcbiAgICByZXR1cm4gTnVtYmVyKGNhYmluLnNwZWNpZmljYXRpb25zLlNvdmVyb20pO1xuICB9LFxufSk7XG5cbmV4cG9ydCBjb25zdCBEQVlTT0ZGX0JBU0VVUkwgPSBcImh0dHBzOi8vZmlybWFoeXR0ZS5kYXlzb2ZmLm5vXCI7XG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuXG5jb25zdCBEZWJ1Z0RhdGEgPSAoeyBkYXRhIH06IHsgZGF0YTogYW55IH0pID0+IHtcbiAgaWYgKHR5cGVvZiBkYXRhID09PSBcInN0cmluZ1wiKSByZXR1cm4gPHByZT57ZGF0YX08L3ByZT47XG4gIGNvbnN0IGVudHJpZXMgPSBPYmplY3QuZW50cmllcyhkYXRhKS5tYXAoKFtrZXksIHZhbHVlXSkgPT4gKFxuICAgIDxSZWFjdC5GcmFnbWVudCBrZXk9e2tleX0+XG4gICAgICA8aDM+e2tleX08L2gzPlxuICAgICAgPHByZT5cbiAgICAgICAge3R5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiA/IHZhbHVlIDogSlNPTi5zdHJpbmdpZnkodmFsdWUsIG51bGwsIDIpfVxuICAgICAgPC9wcmU+XG4gICAgPC9SZWFjdC5GcmFnbWVudD5cbiAgKSk7XG4gIHJldHVybiA8PntlbnRyaWVzfTwvPjtcbn07XG5leHBvcnQgZGVmYXVsdCBEZWJ1Z0RhdGE7XG4iLCAiaW1wb3J0IHsgYWxsb3dzRG9ncywgQ2FiaW5EZXRhaWxlZCwgREFZU09GRl9CQVNFVVJMLCBoYXNTYXVuYSB9IGZyb20gXCJ+L2RvbWFpblwiO1xuXG5pbnRlcmZhY2UgQ2FiaW5DYXJkUHJvcHMge1xuICBjYWJpbjogQ2FiaW5EZXRhaWxlZDtcbn1cbmNvbnN0IENhYmluQ2FyZCA9ICh7IGNhYmluIH06IENhYmluQ2FyZFByb3BzKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPGFydGljbGU+XG4gICAgICA8aGVhZGVyPlxuICAgICAgICA8YSBocmVmPXtgJHtEQVlTT0ZGX0JBU0VVUkx9JHtjYWJpbi5saW5rfWB9PlxuICAgICAgICAgIDxoMj57Y2FiaW4udGl0bGV9PC9oMj5cbiAgICAgICAgPC9hPlxuICAgICAgPC9oZWFkZXI+XG4gICAgICB7YWxsb3dzRG9ncyhjYWJpbikgJiYgXCJcdUQ4M0RcdURDMzZcIn1cbiAgICAgIHtoYXNTYXVuYShjYWJpbikgJiYgXCJcdUQ4M0VcdURERDZcIn1cbiAgICAgIDxpbWcgc3JjPXtgJHtEQVlTT0ZGX0JBU0VVUkx9JHtjYWJpbi5pbWFnZXNbMF19YH0gYWx0PVwiXCIgLz5cbiAgICAgIDxkZXRhaWxzPlxuICAgICAgICA8c3VtbWFyeT5CZXNrcml2ZWxzZTwvc3VtbWFyeT5cbiAgICAgICAgPHAgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3sgX19odG1sOiBjYWJpbi5kZXNjcmlwdGlvbiB9fSAvPlxuICAgICAgPC9kZXRhaWxzPlxuICAgIDwvYXJ0aWNsZT5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENhYmluQ2FyZDtcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBDYWJpbkRldGFpbGVkLCBwcmVwYXJlZENhYmluLCBEQVlTT0ZGX0JBU0VVUkwgfSBmcm9tIFwifi9kb21haW5cIjtcblxuaW50ZXJmYWNlIENhYmluc1RhYmxlUHJvcHMge1xuICBjYWJpbnM6IENhYmluRGV0YWlsZWRbXTtcbn1cbmNvbnN0IENhYmluVGFibGUgPSAoeyBjYWJpbnM6IGNhYmluc1JhdyB9OiBDYWJpbnNUYWJsZVByb3BzKSA9PiB7XG4gIGludGVyZmFjZSBTb3J0U3RhdGUge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBkaXI6IFwiXHVEODNEXHVERDNDXCIgfCBcIlx1RDgzRFx1REQzRFwiIHwgXCJcIjtcbiAgfVxuICBjb25zdCBbc29ydFN0YXRlLCBzZXRTb3J0U3RhdGVdID0gUmVhY3QudXNlU3RhdGU8U29ydFN0YXRlPih7XG4gICAgbmFtZTogXCJMb2thc2pvblwiLFxuICAgIGRpcjogXCJcIixcbiAgfSk7XG4gIGNvbnN0IHRvZ2dsZVNvcnRTdGF0ZSA9IChuYW1lOiBzdHJpbmcpID0+XG4gICAgc2V0U29ydFN0YXRlKChjdXJyZW50KSA9PiB7XG4gICAgICBpZiAobmFtZSAhPT0gY3VycmVudC5uYW1lKSByZXR1cm4geyBuYW1lLCBkaXI6IFwiXHVEODNEXHVERDNDXCIgfTtcbiAgICAgIGVsc2UgaWYgKGN1cnJlbnQuZGlyID09PSBcIlwiKSByZXR1cm4geyBuYW1lLCBkaXI6IFwiXHVEODNEXHVERDNDXCIgfTtcbiAgICAgIGVsc2UgaWYgKGN1cnJlbnQuZGlyID09PSBcIlx1RDgzRFx1REQzQ1wiKSByZXR1cm4geyBuYW1lLCBkaXI6IFwiXHVEODNEXHVERDNEXCIgfTtcbiAgICAgIGVsc2UgcmV0dXJuIHsgbmFtZSwgZGlyOiBcIlx1RDgzRFx1REQzQ1wiIH07XG4gICAgfSk7XG5cbiAgY29uc3QgY2FiaW5zID0gY2FiaW5zUmF3Lm1hcChwcmVwYXJlZENhYmluKTtcbiAgaWYgKHNvcnRTdGF0ZS5kaXIgIT09IFwiXCIpIHtcbiAgICBjb25zdCB4ID0gKGNhYmluOiBhbnkpID0+IHtcbiAgICAgIGlmIChzb3J0U3RhdGUubmFtZSA9PT0gXCJMb2thc2pvblwiKSByZXR1cm4gY2FiaW4ubG9jYXRpb25OYW1lO1xuICAgICAgaWYgKHNvcnRTdGF0ZS5uYW1lID09PSBcIlNvdmVyb21cIikgcmV0dXJuIGNhYmluLmJlZHJvb21zO1xuICAgICAgaWYgKHNvcnRTdGF0ZS5uYW1lID09PSBcIkh1bmRlclwiKSByZXR1cm4gY2FiaW4uYWxsb3dzRG9ncztcbiAgICAgIGlmIChzb3J0U3RhdGUubmFtZSA9PT0gXCJJbnRlcm5ldHRcIikgcmV0dXJuIGNhYmluLmhhc0ludGVybmV0O1xuICAgICAgaWYgKHNvcnRTdGF0ZS5uYW1lID09PSBcIkJhZHN0dWVcIikgcmV0dXJuIGNhYmluLmhhc1NhdW5hO1xuICAgICAgaWYgKHNvcnRTdGF0ZS5uYW1lID09PSBcIkJvYmxlYmFkXCIpIHJldHVybiBjYWJpbi5oYXNIb3R0dWI7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYHVuaGFuZGxlZCBzb3J0ICR7c29ydFN0YXRlLm5hbWV9YCk7XG4gICAgfTtcbiAgICBjYWJpbnMuc29ydCgoYSwgYikgPT4ge1xuICAgICAgaWYgKHgoYSkgPCB4KGIpKSB7XG4gICAgICAgIHJldHVybiBzb3J0U3RhdGUuZGlyID09PSBcIlx1RDgzRFx1REQzQ1wiID8gLTEgOiAxO1xuICAgICAgfVxuICAgICAgaWYgKHgoYSkgPiB4KGIpKSB7XG4gICAgICAgIHJldHVybiBzb3J0U3RhdGUuZGlyID09PSBcIlx1RDgzRFx1REQzQ1wiID8gMSA6IC0xO1xuICAgICAgfVxuICAgICAgcmV0dXJuIDA7XG4gICAgfSk7XG4gIH1cblxuICBjb25zdCBUaCA9IChuYW1lOiBzdHJpbmcpID0+IChcbiAgICA8dGggc2NvcGU9XCJjb2xcIiBvbkNsaWNrPXsoKSA9PiB0b2dnbGVTb3J0U3RhdGUobmFtZSl9PlxuICAgICAge25hbWV9IHtuYW1lID09PSBzb3J0U3RhdGUubmFtZSAmJiBzb3J0U3RhdGUuZGlyfVxuICAgIDwvdGg+XG4gICk7XG4gIHJldHVybiAoXG4gICAgPGZpZ3VyZT5cbiAgICAgIDx0YWJsZT5cbiAgICAgICAgPHRoZWFkPlxuICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgIHtUaChcIkxva2Fzam9uXCIpfVxuICAgICAgICAgICAge1RoKFwiU292ZXJvbVwiKX1cbiAgICAgICAgICAgIHtUaChcIkh1bmRlclwiKX1cbiAgICAgICAgICAgIHtUaChcIkludGVybmV0dFwiKX1cbiAgICAgICAgICAgIHtUaChcIkJhZHN0dWVcIil9XG4gICAgICAgICAgICB7VGgoXCJCb2JsZWJhZFwiKX1cbiAgICAgICAgICA8L3RyPlxuICAgICAgICA8L3RoZWFkPlxuICAgICAgICA8dGJvZHk+XG4gICAgICAgICAge2NhYmlucy5tYXAoKGNhYmluKSA9PiAoXG4gICAgICAgICAgICA8dHIga2V5PXtjYWJpbi5saW5rfT5cbiAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgIDxhIGhyZWY9e2Ake0RBWVNPRkZfQkFTRVVSTH0ke2NhYmluLmxpbmt9YH0gdGFyZ2V0PVwiX2JsYW5rXCI+XG4gICAgICAgICAgICAgICAgICB7Y2FiaW4ubG9jYXRpb25OYW1lfSBcdTIxOTdcbiAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgIDx0ZD57Y2FiaW4uYmVkcm9vbXN9PC90ZD5cbiAgICAgICAgICAgICAgPHRkPntjYWJpbi5hbGxvd3NEb2dzID8gXCJcdUQ4M0RcdURDMzZcIiA6IFwiLVwifTwvdGQ+XG4gICAgICAgICAgICAgIDx0ZD57Y2FiaW4uaGFzSW50ZXJuZXQgPyBcIlx1RDgzQ1x1REYxMFwiIDogXCItXCJ9PC90ZD5cbiAgICAgICAgICAgICAgPHRkPntjYWJpbi5oYXNTYXVuYSA/IFwiXHVEODNFXHVEREQ2XCIgOiBcIi1cIn08L3RkPlxuICAgICAgICAgICAgICA8dGQ+e2NhYmluLmhhc0hvdHR1YiA/IFwiXHUyNjY4XHVGRTBGXCIgOiBcIi1cIn08L3RkPlxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC90Ym9keT5cbiAgICAgIDwvdGFibGU+XG4gICAgPC9maWd1cmU+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDYWJpblRhYmxlO1xuIiwgImV4cG9ydCBkZWZhdWx0IHsndmVyc2lvbic6Jzg1M2NjZDMzJywnZW50cnknOnsnbW9kdWxlJzonL2J1aWxkL2VudHJ5LmNsaWVudC1VQlY0QlY3Ty5qcycsJ2ltcG9ydHMnOlsnL2J1aWxkL19zaGFyZWQvY2h1bmstRVNPVkFPNjcuanMnXX0sJ3JvdXRlcyc6eydyb290Jzp7J2lkJzoncm9vdCcsJ3BhcmVudElkJzp1bmRlZmluZWQsJ3BhdGgnOicnLCdpbmRleCc6dW5kZWZpbmVkLCdjYXNlU2Vuc2l0aXZlJzp1bmRlZmluZWQsJ21vZHVsZSc6Jy9idWlsZC9yb290LTVHUDJPMlhRLmpzJywnaW1wb3J0cyc6dW5kZWZpbmVkLCdoYXNBY3Rpb24nOmZhbHNlLCdoYXNMb2FkZXInOmZhbHNlLCdoYXNDYXRjaEJvdW5kYXJ5JzpmYWxzZSwnaGFzRXJyb3JCb3VuZGFyeSc6ZmFsc2V9LCdyb3V0ZXMvaW5kZXgnOnsnaWQnOidyb3V0ZXMvaW5kZXgnLCdwYXJlbnRJZCc6J3Jvb3QnLCdwYXRoJzp1bmRlZmluZWQsJ2luZGV4Jzp0cnVlLCdjYXNlU2Vuc2l0aXZlJzp1bmRlZmluZWQsJ21vZHVsZSc6Jy9idWlsZC9yb3V0ZXMvaW5kZXgtQlJWNUpDUTIuanMnLCdpbXBvcnRzJzp1bmRlZmluZWQsJ2hhc0FjdGlvbic6ZmFsc2UsJ2hhc0xvYWRlcic6dHJ1ZSwnaGFzQ2F0Y2hCb3VuZGFyeSc6ZmFsc2UsJ2hhc0Vycm9yQm91bmRhcnknOmZhbHNlfX0sJ3VybCc6Jy9idWlsZC9tYW5pZmVzdC04NTNDQ0QzMy5qcyd9OyJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQUF1QjtBQUFBO0FBQUE7OztBQ0F2QjtBQUFBO0FBQUE7QUFBQTtBQVlBLFdBQU8sZUFBZSxTQUFTLGNBQWMsRUFBRSxPQUFPO0FBRXRELFFBQUksT0FBTyxRQUFRO0FBSW5CLFdBQU8sZUFBZSxTQUFTLDRCQUE0QjtBQUFBLE1BQ3pELFlBQVk7QUFBQSxNQUNaLEtBQUssV0FBWTtBQUFFLGVBQU8sS0FBSztBQUFBO0FBQUE7QUFFakMsV0FBTyxlQUFlLFNBQVMsb0NBQW9DO0FBQUEsTUFDakUsWUFBWTtBQUFBLE1BQ1osS0FBSyxXQUFZO0FBQUUsZUFBTyxLQUFLO0FBQUE7QUFBQTtBQUVqQyxXQUFPLGVBQWUsU0FBUyxzQ0FBc0M7QUFBQSxNQUNuRSxZQUFZO0FBQUEsTUFDWixLQUFLLFdBQVk7QUFBRSxlQUFPLEtBQUs7QUFBQTtBQUFBO0FBRWpDLFdBQU8sZUFBZSxTQUFTLG1DQUFtQztBQUFBLE1BQ2hFLFlBQVk7QUFBQSxNQUNaLEtBQUssV0FBWTtBQUFFLGVBQU8sS0FBSztBQUFBO0FBQUE7QUFHakMsQUFZQSxXQUFPLGVBQWUsU0FBUyxjQUFjLEVBQUUsT0FBTztBQUV0RCxRQUFJLGdCQUFnQixRQUFRO0FBSTVCLFdBQU8sZUFBZSxTQUFTLGdCQUFnQjtBQUFBLE1BQzdDLFlBQVk7QUFBQSxNQUNaLEtBQUssV0FBWTtBQUFFLGVBQU8sY0FBYztBQUFBO0FBQUE7QUFFMUMsV0FBTyxlQUFlLFNBQVMsOEJBQThCO0FBQUEsTUFDM0QsWUFBWTtBQUFBLE1BQ1osS0FBSyxXQUFZO0FBQUUsZUFBTyxjQUFjO0FBQUE7QUFBQTtBQUUxQyxXQUFPLGVBQWUsU0FBUyw4QkFBOEI7QUFBQSxNQUMzRCxZQUFZO0FBQUEsTUFDWixLQUFLLFdB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
