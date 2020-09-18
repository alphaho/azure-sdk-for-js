/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";
import { GeneratedClientOptionalParams } from "./models";

const packageName = "@azure/ai-text-analytics";
const packageVersion = "5.1.0-beta.2";

export class GeneratedClientContext extends coreHttp.ServiceClient {
  endpoint: string;

  /**
   * Initializes a new instance of the GeneratedClientContext class.
   * @param endpoint Supported Cognitive Services endpoints (protocol and hostname, for example:
   *                 https://westus.api.cognitive.microsoft.com).
   * @param options The parameter options
   */
  constructor(endpoint: string, options?: GeneratedClientOptionalParams) {
    if (endpoint === undefined) {
      throw new Error("'endpoint' cannot be null");
    }

    // Initializing default values for options
    if (!options) {
      options = {};
    }

    if (!options.userAgent) {
      const defaultUserAgent = coreHttp.getDefaultUserAgentValue();
      options.userAgent = `${packageName}/${packageVersion} ${defaultUserAgent}`;
    }

    super(undefined, options);

    this.requestContentType = "application/json; charset=utf-8";

    this.baseUri =
      options.endpoint || "{Endpoint}/text/analytics/v3.1-preview.2";

    // Parameter assignments
    this.endpoint = endpoint;
  }
}
