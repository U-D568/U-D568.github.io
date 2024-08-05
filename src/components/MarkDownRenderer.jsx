import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown"
import { fetchfile } from "../common/common";
import ErrorPage from "../pages/ErrorPage";


export default function MarkDownRenderer(props) {
    const { path } = props;
    const [text, setText] = useState("");
    const [meta, setMeta] = useState({});
    const [isError, setError] = useState(false);

    useEffect(() => {
        import("../posts/helloworld.md")
            .then(res =>
                fetch(res.default)
                    .then(response => response.text())
                    .then(text => handleText(text))
                    .catch(err => console.log(err))
            )
    }, []);

    // Parsing meta data from markdown
    const handleText = (inputText) => {
        let text = inputText;
        const metaRegex = /---+/g;
        let metastring = "";
        let metadata = {};
        let startIndex = -1;
        let i = 0
        for (let match of text.matchAll(metaRegex)) {
            if (i == 0) {
                startIndex = match.index + match[0].length;
            } else if (i == 1) {
                let endIndex = match.index
                metastring = text.slice(startIndex, endIndex);
                text = text.slice(endIndex + match[0].length);
            }

            if (i == 1)
                break;
            else
                i += 1;
        }

        const valueRegex = /.+:.+/g;
        for (let match of metastring.matchAll(valueRegex)) {
            let [key, value] = match[0].split(":");
            metadata[key.trim()] = value.trim();
        }

        setMeta(metadata);
        setText(text);
    }

    return (
        <div>
            <div>{meta["title"]}</div>
            <div>{meta["date"]}</div>
            <ReactMarkdown>
                {text}
            </ReactMarkdown>
        </div>
    );
}