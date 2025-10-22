declare const _default: {
    nested: {
        decoderbufs: {
            options: {
                java_package: string;
                java_outer_classname: string;
                optimize_for: string;
            };
            nested: {
                Op: {
                    values: {
                        UNKNOWN: number;
                        INSERT: number;
                        UPDATE: number;
                        DELETE: number;
                        BEGIN: number;
                        COMMIT: number;
                    };
                };
                Point: {
                    fields: {
                        x: {
                            rule: string;
                            type: string;
                            id: number;
                        };
                        y: {
                            rule: string;
                            type: string;
                            id: number;
                        };
                    };
                };
                DatumMessage: {
                    oneofs: {
                        datum: {
                            oneof: string[];
                        };
                    };
                    fields: {
                        columnName: {
                            type: string;
                            id: number;
                        };
                        columnType: {
                            type: string;
                            id: number;
                        };
                        datumInt32: {
                            type: string;
                            id: number;
                        };
                        datumInt64: {
                            type: string;
                            id: number;
                        };
                        datumFloat: {
                            type: string;
                            id: number;
                        };
                        datumDouble: {
                            type: string;
                            id: number;
                        };
                        datumBool: {
                            type: string;
                            id: number;
                        };
                        datumString: {
                            type: string;
                            id: number;
                        };
                        datumBytes: {
                            type: string;
                            id: number;
                        };
                        datumPoint: {
                            type: string;
                            id: number;
                        };
                        datumMissing: {
                            type: string;
                            id: number;
                        };
                    };
                };
                TypeInfo: {
                    fields: {
                        modifier: {
                            rule: string;
                            type: string;
                            id: number;
                        };
                        valueOptional: {
                            rule: string;
                            type: string;
                            id: number;
                        };
                    };
                };
                RowMessage: {
                    fields: {
                        transactionId: {
                            type: string;
                            id: number;
                        };
                        commitTime: {
                            type: string;
                            id: number;
                        };
                        table: {
                            type: string;
                            id: number;
                        };
                        op: {
                            type: string;
                            id: number;
                        };
                        newTuple: {
                            rule: string;
                            type: string;
                            id: number;
                            options: {
                                packed: boolean;
                            };
                        };
                        oldTuple: {
                            rule: string;
                            type: string;
                            id: number;
                            options: {
                                packed: boolean;
                            };
                        };
                        newTypeinfo: {
                            rule: string;
                            type: string;
                            id: number;
                            options: {
                                packed: boolean;
                            };
                        };
                    };
                };
            };
        };
    };
};
export default _default;
