/**
 * Tags source code parts for a programming language code block.
 *
 * Code blocks all have the 'codeblock' and 'code_{language}' classes.
 * This function iterates over all elements in the document, and performs the
 * string replacement to add <span> tags with appropriate classes to the source
 * code parts.
 * Appliable extra rules are 2-element lists with the first element
 * being what to match (RegExp or String), and the second is the name of the
 * class to add.
 * This function is intended to be called by wrapper functions for each
 * programming language.
 *
 * @param {String} language     Name of the language in all lowercase.
 * @param {Array}  keywords     An array of keywords in the language.
 * @param {Array}  types        An array of builtin types in the language.
 * @param {String} lc_start     Sequence marking the start of a line comment.
 * @param {String} bc_start     Sequence marking the start of a block comment.
 * @param {String} bc_end       Sequence marking the end of a block comment.
 * @param {Array}  extra_rules  Extra rules to apply.
 */
function tag_code(
    language,
    keywords,
    types,
    lc_start,
    bc_start,
    bc_end,
    extra_rules
) {
    let re_keyword = new RegExp("\\b(" + keywords.join("|") + ")\\b", "gm");
    let re_builtin_type = new RegExp("\\b(" + types.join("|") + ")\\b", "gm");
    let re_integer = new RegExp("\\b((?:0x[0-9a-fA-F]+|0b[01]+|[0-9]+)[Ll]{0,2})\\b", "gm");
    let re_float = new RegExp("\\b((?:\.[0-9]+|[0-9]+\.|[0-9]+\.[0-9]+)[LlFf]?)\\b", "gm");
    let re_char = new RegExp("('(?:.|\\\\\\w+)')", "gm");
    let re_string = new RegExp("(\\\"[^\\\"]*\\\")", "gm");
    let re_line_comment = new RegExp("(" + lc_start + ".*$)", "gm");
    let re_block_comment = new RegExp("(" + bc_start + ".*" + bc_end + ")", "gms");

    let blocks = document.getElementsByClassName("codeblock");
    for (let i = 0; i < blocks.length; ++i) {
        let node = blocks[i];
        const language_class = "code_" + language;
        if (node.classList.contains(language_class)) {
            node.innerHTML = node.innerHTML
                .replace(re_keyword, "<span class='keyword'>$1</span>")
                .replace(re_builtin_type, "<span class='typename'>$1</span>")
                .replace(re_integer, "<span class='number'>$1</span>")
                .replace(re_float, "<span class='number'>$1</span>")
                .replace(re_char, "<span class='string'>$1</span>")
                .replace(re_string, "<span class='string'>$1</span>")
                .replace(re_line_comment, "<span class='comment'>$1</span>")
                .replace(re_block_comment, "<span class='comment'>$1</span>");

            for (let i = 0; i < extra_rules.length; ++i) {
                let rule = extra_rules[i];
                node.innerHTML = node.innerHTML.replace(
                    rule[0],
                    "<span class='" + rule[1] + "'>$1</span>"
                );
            }
        }
    }
};

/**
 * Tags source code parts for C/C++ (cpp) code blocks.
 */
function tag_cpp() {
    const keywords = [
        "alignas", "alignof", "and", "and_eq", "asm", "atomic_cancel",
        "atomic_commit", "atomic_noexcept", "auto", "bitand", "bitor", "bool",
        "break", "case", "catch", "char", "char8_t", "char16_t", "char32_t",
        "class", "compl", "concept", "const", "consteval", "constexpr",
        "constinit", "const_cast", "continue", "co_await", "co_return",
        "co_yield", "decltype", "default", "delete", "do", "double",
        "dynamic_cast", "else", "enum", "explicit", "export", "extern",
        "false", "float", "for", "friend", "goto", "if", "inline", "int",
        "long", "mutable", "namespace", "new", "noexcept", "not", "not_eq",
        "nullptr", "operator", "or", "or_eq", "private", "protected", "public",
        "reflexpr", "register", "reinterpret_cast", "requires", "return",
        "short", "signed", "sizeof", "static", "static_assert", "static_cast",
        "struct", "switch", "synchronized", "template", "this", "thread_local",
        "throw", "true", "try", "typedef", "typeid", "typename", "union",
        "unsigned", "using", "virtual", "void", "volatile", "wchar_t", "while",
        "xor", "xor_eq"
    ];

    const types = [
        "ssize_t", "tm", "time_t", "clock_t", "timespec", "thrd_t", "mtx_t",
        "cnd_t", "tss_t", "fpos_t", "atomic_bool", "atomic_char",
        "atomic_schar", "atomic_uchar", "atomic_short", "atomic_ushort",
        "atomic_int", "atomic_uint", "atomic_long", "atomic_ulong",
        "atomic_llong", "atomic_ullong", "atomic_char16_t", "atomic_char32_t",
        "atomic_wchar_t", "atomic_int_least8_t", "atomic_uint_least8_t",
        "atomic_int_least16_t", "atomic_uint_least16_t", "atomic_int_least32_t",
        "atomic_uint_least32_t", "atomic_int_least64_t",
        "atomic_uint_least64_t", "atomic_int_fast8_t", "atomic_uint_fast8_t",
        "atomic_int_fast16_t", "atomic_uint_fast16_t", "atomic_int_fast32_t",
        "atomic_uint_fast32_t", "atomic_int_fast64_t", "atomic_uint_fast64_t",
        "atomic_intptr_t", "atomic_uintptr_t", "atomic_size_t",
        "atomic_ptrdiff_t", "atomic_intmax_t", "atomic_uintmax_t",
        "memory_order", "atomic_flag", "va_list", "ptrdiff_t", "max_align_t",
        "div_t", "ldiv_t", "lldiv_t", "imaxdiv_t", "float_t", "double_t",
        "size_t", "FILE", "fenv_t", "fexcept_t", "int8_t", "int16_t", "int32_t",
        "int64_t", "int_fast8_t", "int_fast16_t", "int_fast32_t",
        "int_fast64_t", "int_least8_t", "int_least16_t", "int_least32_t",
        "int_least64_t", "intmax_t", "intptr_t", "uint8_t", "uint16_t",
        "uint32_t", "uint64_t", "uint_fast8_t", "uint_fast16_t",
        "uint_fast32_t", "uint_fast64_t", "uint_least8_t", "uint_least16_t",
        "uint_least32_t", "uint_least64_t", "uintmax_t", "uintptr_t", "lconv"
    ];

    rules = [
        [new RegExp("^(\\s*#.*)$", "gm"), "preprocessor"],
        [new RegExp("([A-Z_]{3,})", "gm"), "macro"]
    ];

    tag_code("cpp", keywords, types, "//", "/\\*", "\\*/", rules);
}

/**
 * Tags source code parts for Python (py) code blocks.
 */
function tag_py() {
    const keywords = [
        "False", "None", "True", "and", "as", "assert", "async", "await",
        "break", "class", "continue", "def", "del", "elif", "else", "except",
        "finally", "for", "from", "global", "if", "import", "in", "is",
        "lambda", "nonlocal", "not", "or", "pass", "raise", "return", "try",
        "while", "with", "yield", "isinstance", "len"
    ];

    const types = [
        "int", "float", "str", "bytes", "list", "dict", "set", "bool",
        "complex", "tuple", "range", "bytearray", "memoryview", "frozenset",
        "NoneType"
    ];

    tag_code("py", keywords, types, "#", "\0", "\0", []);
}