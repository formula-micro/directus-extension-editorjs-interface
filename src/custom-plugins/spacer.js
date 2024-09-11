export default class Spacer
{
    constructor({ data, api })
    {
        this.data = data;
        this.api = api;
        this.wrapper = undefined;
    }

    static get toolbox() {
        return {
            title: "Spacer",
            icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15"/></svg>'
        };
    }
  
    renderSettings() {
        const settings = [
            {
                name: "line",
                icon: '<svg width="22" height="22" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15"/></svg>'
            },
            {
                name: "invisible",
                icon: '<svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12c1.292 4.338 5.31 7.5 10.066 7.5.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"/></svg>'
            },
            {
                name: "enlarge",
                icon: '<svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m15 9l5-5m0 0v4m0-4h-4M9 15l-5 5m0 0v-4m0 4h4"/></svg>'
            },
        ];
        const wrapper = document.createElement("div");

        settings.forEach( tune => {
            let button = document.createElement("div");

            button.id = `tune-${tune.name}`
            button.classList.add("cdx-settings-button");
            if (this.data && this.data.type === tune.name) button.classList.toggle("cdx-settings-button--active");
            button.innerHTML = tune.icon;
            button.onclick = () =>
            {
                if (tune.name === "line" || tune.name === "invisible")
                {
                    const otherTune = tune.name === "line" ? "invisible" : "line";
                    const otherButton = wrapper.querySelector(`#tune-${ otherTune }`);

                    if (button.classList.contains("cdx-settings-button--active"))
                    {
                        button.classList.remove("cdx-settings-button--active");
                        otherButton.classList.add("cdx-settings-button--active");
                        this.data["type"] = otherTune;
                    }
                    else
                    {
                        button.classList.add("cdx-settings-button--active");
                        otherButton.classList.remove("cdx-settings-button--active");
                        this.data["type"] = tune.name;
                    }
                }
                else
                {
                    if (this.data["size"] === "small")
                        this.data["size"] = "medium";
                    else if (this.data["size"] === "medium")
                        this.data["size"] = "large";
                    else if (this.data["size"] === "large")
                        this.data["size"] = "extraLarge";
                    else if (this.data["size"] === "extraLarge")
                        this.data["size"] = "small";
                    else
                        this.data["size"] = "medium";
                }

                this.wrapper.innerHTML = "";
                this.wrapper.appendChild(this.createSpacer());
            };
            wrapper.appendChild(button);
        });

        return wrapper;
    }

    render() {
        const sizes = {
            small: "py-4",
            medium: "py-8",
            large: "py-16",
            extraLarge: "py-32",
        };
        
        this.wrapper = document.createElement("div");
        this.wrapper.innerHTML = "";
        this.wrapper.appendChild(this.createSpacer());

        return this.wrapper;
    }

    createSpacer() {
        const sizes = {
            small: "py-4",
            medium: "py-8",
            large: "py-16",
            extraLarge: "py-32",
        };
        const container = document.createElement("div");
        container.className = this.data && this.data.size ? sizes[this.data.size] : "py-8";

        const spacer = document.createElement("div");
        spacer.className = "mt-2 border-b border-gray-200 w-full";
        if (this.data && this.data.type === "line") container.appendChild(spacer);

        return container;
    }
  
    save(blockContent) {
        return Object.assign(this.data);
    }
}