import {uuidv4} from "@/store/repo/functions";

export const TextEditorEngine = {
    fromBlock(block) {
        return block.data.text
    },
    toBlock(text) {
        return {
            id: uuidv4(),
            container: "TextEditor",
            data: {
                text
            }
        }
    }
}
