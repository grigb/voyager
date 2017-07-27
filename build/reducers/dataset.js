"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("../actions");
var models_1 = require("../models");
var schema_1 = require("compassql/build/src/schema");
function datasetReducer(dataset, action) {
    if (dataset === void 0) { dataset = models_1.DEFAULT_DATASET; }
    switch (action.type) {
        case actions_1.DATASET_URL_REQUEST: {
            return __assign({}, dataset, { isLoading: true });
        }
        case actions_1.DATASET_URL_RECEIVE: {
            var _a = action.payload, name_1 = _a.name, url = _a.url, schema = _a.schema;
            return __assign({}, dataset, { isLoading: false, name: name_1,
                schema: schema, data: { url: url } });
        }
        case actions_1.DATASET_INLINE_RECEIVE: {
            var _b = action.payload, name_2 = _b.name, data = _b.data, schema = _b.schema;
            return __assign({}, dataset, { isLoading: false, name: name_2,
                schema: schema,
                data: data });
        }
    }
    return schemaReducer(dataset, action);
}
exports.datasetReducer = datasetReducer;
function schemaReducer(dataset, action) {
    if (dataset === void 0) { dataset = models_1.DEFAULT_DATASET; }
    switch (action.type) {
        case actions_1.DATASET_SCHEMA_CHANGE_FIELD_TYPE: {
            var _a = action.payload, field = _a.field, type = _a.type;
            return __assign({}, dataset, { schema: changeFieldType(dataset.schema, field, type) });
        }
        case actions_1.DATASET_SCHEMA_CHANGE_ORDINAL_DOMAIN: {
            var _b = action.payload, field = _b.field, domain = _b.domain;
            return __assign({}, dataset, { schema: changeOrdinalDomain(dataset.schema, field, domain) });
        }
    }
    return dataset;
}
exports.schemaReducer = schemaReducer;
function updateSchema(schema, field, changedFieldSchema) {
    var originalTableSchema = schema.tableSchema();
    var updatedTableSchemaFields = originalTableSchema.fields.map(function (fieldSchema) {
        if (fieldSchema.name !== field) {
            return fieldSchema;
        }
        return changedFieldSchema;
    });
    return new schema_1.Schema(__assign({}, originalTableSchema, { fields: updatedTableSchemaFields }));
}
function changeFieldType(schema, field, type) {
    return updateSchema(schema, field, __assign({}, schema.fieldSchema(field), { vlType: type }));
}
exports.changeFieldType = changeFieldType;
function changeOrdinalDomain(schema, field, domain) {
    return updateSchema(schema, field, __assign({}, schema.fieldSchema(field), { ordinalDomain: domain }));
}
exports.changeOrdinalDomain = changeOrdinalDomain;