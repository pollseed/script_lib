(function() {
    "use strict";

    const ERROR_CODE_BLANK = -1;

    let StringUtils = {
        isEmpty: str => {
            let __str = __parseStr(str);
            return (__str === null) || (__str.length <= 0);
        },
        isNotEmpty: str => {
            return !isEmpty(str);
        },
        isBlank: str => {
            const BLANK_CHR = [" ", "　"];
            let __str = __parseStr(str), strLen = __str.length, i, ch;
            if (__str === null || strLen === 0) return true;
            for (i = 0; i < strLen; i++) {
                ch = __str.charAt(i);
                if (ERROR_CODE_BLANK == BLANK_CHR.indexOf(ch)) {
                    return false;
                }
            }
            return true
        },
        isNotBlank: str => {
            return !isBlank(str);
        },
        trim: str => {
            let __str = __parseStr(str);
            return __str === null ? null : __str.trim();
        },
        trimToNull: str => {
            let __str = this.trim(str);
            return (__str === null) || (__str.length === 0) ? null : __str;
        },

            /*
             * create number of str element array.
             * @param str element.
             * @limit number of array.
             */
        createPlaceholder: (str, limit) => {
            let placeholder = `${str},`.repeat(limit).split(',');
            placeholder.pop();
            return placeholder;
        }
    };

    function __parseStr(str) {
        return `${str}`;
    }

    class Dom {
        constructor(id) {
            this._id = document.getElementById(id);
        }
        getIdDom() {
            return this._id;
        }
        isNotEquals(text) {
            return this.getIdDom().innerText !== text;
        }
    }

    class InputDom extends Dom {
        getInputValue() {
            let value = super.getIdDom().value;
            if (StringUtils.isBlank(value)) {
                console.info(`not blank, errorCode [${ERROR_CODE_BLANK}]`);
                return ERROR_CODE_BLANK;
            }
            return value;
        }
    }

    class RequestUrls {
        constructor() {
            this.__urls = new Map()
                .set('YAHOO', 'http://search.yahoo.co.jp/search?p=')
                .set('GITHUB', 'https://github.com/search?utf8=✓&q=')
                .set('STACKOVERFLOW', 'http://stackoverflow.com/search?q=')
                .set('NONE', '');
        }
        getUrl(serviceName, searchWord) {
            let url = this.__urls.get(serviceName);
            return url + searchWord;
        }
    }


    class Timer {
        constructor() {
            this.__times = new Map()
                .set(1, {hour: 17, minute: 45})
                .set(2, {hour: 17, minute: 45})
                .set(3, {hour: 17, minute: 45})
                .set(4, {hour: 17, minute: 45})
                .set(5, {hour: 17, minute: 45})
                .set(6, {hour: 0, minute: 0})
                .set(7, {hour: 0, minute: 0});
        }
        getRemainTime() {
            let d = new Date(),
            now = this.__times.get(d.getDay()),
            hour = now.hour - d.getHours(),
                minute = now.minute - d.getMinutes();
            if (minute < 0) { hour--; minute+=60; }
            return { hour: hour, minute: minute };
        }
    }

    class Sql {
        /**
         * テーブル名を指定してください.
         */
        constructor(tblName) {
            this.__tblName = tblName;
        }

        /**
         * 指定された条件でinsert文を生成します.
         *
         * @param {Array.<string>} columnNames カラム名の配列
         * @param {Array.<string>} values_array 挿入値レコードの配列(*insert文の生成数用意して下さい)
         * @param {Boolean} isSingleSql シングル文にする場合 {@code true} にして下さい
         * @return {string} insert文
         *
         */
        createInsert(columnNames, values_array, isSingleSql) {
            if (columnNames === null || columnNames === undefined
                    || values_array === null || values_array === undefined) return false;
            let sql_column = '', sql_value = '', sqls = [], i = 0, j = 0;
            columnNames.forEach(v => {
                if (i !== 0) sql_column += ',';
                sql_column += v;
                i++;
            });
            values_array.forEach(values => {
                values.forEach(v => {
                    if (j !== 0) sql_value += ',';
                    sql_value += v;
                    j++;
                });
                if (isSingleSql) {
                    sqls.push(sql_value);
                } else {
                    sqls.push(`insert into ${this.__tblName} (${sql_column}) values (${sql_value});`);
                }
                j = 0;
                sql_value = '';
            });
            if (isSingleSql) {
                let sql = '', k = 0;
                sqls.forEach(v => {
                    if (k !== 0) sql += ',';
                    sql += `(${v})`;
                    k++;
                });
                sqls = [];
                sqls.push(`insert into ${this.__tblName} (${sql_column}) values ${sql};`);
            }
            return sqls;
        }
    }


    this.ERROR_CODE_BLANK = ERROR_CODE_BLANK;
    this.StringUtils = StringUtils;
    this.InputDom = InputDom;
    this.RequestUrls = RequestUrls;
    this.Timer = Timer;
    this.Sql = Sql;

}).call(this);
