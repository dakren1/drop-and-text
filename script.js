const dropArea = document.getElementById("dropArea");
const textArea = document.getElementById("textArea");

dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropArea.style.backgroundColor = "#cceeff";
});

dropArea.addEventListener("dragleave", () => {
    dropArea.style.backgroundColor = "#e6f7ff";
});

dropArea.addEventListener("drop", (e) => {
    e.preventDefault();
    dropArea.style.backgroundColor = "#e6f7ff";
    const items = e.dataTransfer.items;

    for (const item of items) {
        const entry = item.webkitGetAsEntry();
        if (entry) {
            traverseFileTree(entry);
        }
    }
});

function traverseFileTree(item, path = "") {
    if (item.isFile) {
        item.file(function(file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                textArea.value += `\n#(${path}${file.name})\n${event.target.result}`;
            };
            reader.readAsText(file);
        });
    } else if (item.isDirectory) {
        const dirReader = item.createReader();
        dirReader.readEntries(function(entries) {
            for (const entry of entries) {
                traverseFileTree(entry, path + item.name + "/");
            }
        });
    }
}
