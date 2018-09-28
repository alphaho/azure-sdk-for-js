// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { ConnectionConfig } from "./connectionConfig";

/**
 * Describes the connection config object that is created after parsing an EventHub connection
 * string. It also provides some convenience methods for getting the address and audience for
 * different entities.
 * @interface EventHubConnectionConfig
 */
export interface EventHubConnectionConfig extends ConnectionConfig {
  /**
   * Provides the EventHub Sender address in one of the following forms based on the input:
   * - `"<hubName>"`
   * - `"<hubName>/Partitions/<partitionId>"`
   *
   * @param partitionId The partitionId in the EventHub to which messages will be sent.
   */
  getEventHubSenderAddress(partitionId?: string | number): string;
  /**
   * Provides the EventHub Sender audience in one of the following forms based on the input:
   * - `"sb://<yournamespace>.servicebus.windows.net/<hubName>"`
   * - `"sb://<yournamespace>.servicebus.windows.net/<hubName>/Partitions/<partitionId>"`
   *
   * @param partitionId The partitionId in the EventHub to which messages will be sent.
   */
  getEventHubSenderAudience(partitionId?: string | number): string;
  /**
   * Provides the EventHub Receiver address:
   * - `"<hub-name>/ConsumerGroups/<consumer-group-name>/Partitions/<partition-id>"`
   *
   * @param partitionId The partitionId in the EventHub from which messages will be received.
   * @param consumergroup The consumergoup in the EventHub from which the messages will
   * be received. Default: `$default`.
   */
  getEventHubReceiverAddress(partitionId: string | number, consumergroup?: string): string;
  /**
   * Provides the EventHub Receiver audience.
   * - `"sb://<your-namespace>.servicebus.windows.net/<hub-name>/ConsumerGroups/<consumer-group-name>/Partitions/<partition-id>"`
   *
   * @param partitionId The partitionId in the EventHub from which messages will be received.
   * @param consumergroup The consumergoup in the EventHub from which the messages will
   * be received. Default: `$default`.
   */
  getEventHubReceiverAudience(partitionId: string | number, consumergroup?: string): string;
  /**
   * Provides the EventHub Management address.
   * - `"<hub-name>/$management"`
   */
  getEventHubManagementAddress(): string;
  /**
   * Provides the EventHub Management audience.
   * - `"sb://<your-namespace>.servicebus.windows.net/<hub-name>/$management"`
   */
  getEventHubManagementAudience(): string;
}

/**
 * Describes the connection config object that is created after parsing an EventHub connection
 * string. It also provides some convenience methods for getting the address and audience for
 * different entities.
 * @module EventHubConnectionConfig
 */
export module EventHubConnectionConfig {
  /**
   * Creates the connection config.
   * @param {string} connectionString - The connection string for a given service like
   * EventHub/ServiceBus.
   * @param {string} [path]           - The name/path of the entity (hub name) to which the
   * connection needs to happen.
   * @returns {EventHubConnectionConfig} EventHubConnectionConfig
   */
  export function create(connectionString: string, path?: string): EventHubConnectionConfig {
    const config = ConnectionConfig.create(connectionString, path) as EventHubConnectionConfig;
    config.getEventHubManagementAudience = () => {
      return `${config.endpoint}${config.entityPath}/$management`;
    };
    config.getEventHubManagementAddress = () => {
      return `${config.entityPath}/$management`;
    };

    config.getEventHubSenderAudience = (partitionId?: string | number) => {
      if (partitionId != undefined) {
        if (typeof partitionId !== "string" && typeof partitionId !== "number") {
          throw new TypeError("'partitionId' must be of type 'string' or 'number'.");
        }
        return `${config.endpoint}${config.entityPath}/Partitions/${partitionId}`;
      } else {
        return `${config.endpoint}${config.entityPath}`;
      }
    };

    config.getEventHubSenderAddress = (partitionId?: string | number) => {
      if (partitionId != undefined) {
        if (typeof partitionId !== "string" && typeof partitionId !== "number") {
          throw new TypeError("'partitionId' must be of type 'string' or 'number'.");
        }
        return `${config.entityPath}/Partitions/${partitionId}`;
      } else {
        return `${config.entityPath}`;
      }
    };

    config.getEventHubReceiverAudience = (partitionId: string | number, consumergroup?: string) => {
      if (partitionId == undefined ||
        (typeof partitionId !== "string" && typeof partitionId !== "number")) {
        throw new TypeError(`'partitionId' is a required parameter and must be of ` +
          `type 'string' or 'number'`);
      }
      if (!consumergroup) consumergroup = "$default";
      return `${config.endpoint}${config.entityPath}/ConsumerGroups/${consumergroup}/` +
        `Partitions/${partitionId}`;
    };

    config.getEventHubReceiverAddress = (partitionId: string | number, consumergroup?: string) => {
      if (partitionId == undefined ||
        (typeof partitionId !== "string" && typeof partitionId !== "number")) {
        throw new TypeError(`'partitionId' is a required parameter and must be of ` +
          `type 'string' or 'number'`);
      }
      if (!consumergroup) consumergroup = "$default";
      return `${config.entityPath}/ConsumerGroups/${consumergroup}/Partitions/${partitionId}`;
    };

    return config;
  }

  /**
   * Validates the properties of connection config.
   * @param {ConnectionConfig} config The connection config to be validated.
   * @returns {void} void
   */
  export function validate(config: EventHubConnectionConfig): void {
    return ConnectionConfig.validate(config, { isEntityPathRequired: true });
  }
}
