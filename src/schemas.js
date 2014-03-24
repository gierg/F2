/**
 * Schema validations
 * @class F2.Schemas
 */
(function(tv4, _) {

	F2.prototype.addSchema = function(name, schema) {
		if (!name) {
			throw 'F2.Schemas: you must provide a schema name.';
		}

		if (!schema) {
			throw 'F2.Schemas: you must provide a schema.';
		}

		if (tv4.getSchema(name)) {
			throw 'F2.Schemas: ' + name + ' is already a registered schema.';
		}

		tv4.addSchema(name, schema);

		return true;
	};

	F2.prototype.hasSchema = function(name) {
		return !!tv4.getSchemaMap()[name];
	};

	F2.prototype.validate = function(json, name) {
		if (!name) {
			throw 'F2.Schemas: you must provide a schema name.';
		}

		var schema = tv4.getSchema(name);

		if (!schema) {
			throw 'F2.Schemas: unrecognized schema name.';
		}

		return tv4.validate(json, schema);
	};

	var schemas = {
		appConfig: {
			id: 'appConfig',
			title: 'App Config',
			type: 'object',
			properties: {
				appId: {
					type: 'string'
				},
				context: {
					type: 'object'
				},
				manifestUrl: {
					type: 'string'
				},
				enableBatchRequests: {
					type: 'boolean'
				},
				views: {
					type: 'array',
					items: {
						type: 'string'
					}
				}
			},
			required: ['appId']
		},
		appContent: {
			id: 'appContent',
			title: 'App Content',
			type: 'object',
			properties: {
				error: {
					type: 'object'
				},
				data: {
					type: 'object'
				},
				html: {
					type: 'string'
				}
			}
		},
		appManifest: {
			id: 'appManifest',
			title: 'App Manifest',
			type: 'object',
			properties: {
				scripts: {
					type: 'array',
					items: {
						type: 'string'
					}
				},
				styles: {
					type: 'array',
					items: {
						type: 'string'
					}
				},
				inlineScripts: {
					type: 'array',
					items: {
						type: 'string'
					}
				},
				apps: {
					type: 'array',
					items: {
						$ref: 'appContent'
					}
				}
			},
			required: ['scripts', 'styles', 'inlineScripts', 'apps']
		},
		containerConfig: {
			id: 'containerConfig',
			title: 'Container Config',
			type: 'object',
			properties: {
				loadScripts: {
					type: 'function'
				},
				loadStyles: {
					type: 'function'
				},
				loadInlineScripts: {
					type: 'function'
				},
				supportedViews: {
					type: 'array',
					items: {
						type: 'string'
					}
				},
				ui: {
					type: 'object',
					properties: {
						modal: {
							type: 'function'
						},
						toggleLoading: {
							type: 'function'
						}
					}
				},
				xhr: {
					type: 'object',
					properties: {
						dataType: {
							type: 'object'
						},
						type: {
							type: 'object'
						},
						url: {
							type: 'object'
						},
						timeout: {
							type: 'integer',
							minimum: 0
						}
					}
				}
			}
		},
		uiModalParams: {
			id: 'uiModalParams',
			title: 'F2.UI Modal Parameters',
			type: 'object',
			properties: {
				buttons: {
					type: 'array',
					items: {
						type: 'object',
						properties: {
							label: {
								type: 'string'
							},
							handler: {
								type: 'function'
							}
						},
						required: ['label', 'handler']
					}
				},
				content: {
					type: 'string'
				},
				onClose: {
					type: 'function'
				},
				title: {
					type: 'string'
				}
			}
		}
	};

	// Add each schema
	for (var name in schemas) {
		tv4.addSchema(name, schemas[name]);
	}

})(tv4, Helpers._);