export default class PriceListing
{
    constructor({ data, api })
    {
        this.data = data;
        this.api = api;
    }

    static get toolbox() {
        return {
            title: "Price listing",
            icon: '<svg width="12" height="12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"/></svg>'
        };
    }

    render() {
        // Add outer div (grey rectangle).
        const container = document.createElement("div");
        container.className = "flex flex-col w-full bg-gray-100 text-gray-800 p-8";
        
        // Add title.
        const title = document.createElement("p");
        title.innerText = this.data && this.data.title ? this.data.title : this.api.i18n.t("Title");
        title.className = "title text-3xl border-gray-600 focus:border-b-2 outline-none";
        title.role = "textbox";
        title.contentEditable = true;
        container.appendChild(title);

        // Add initial price listing.
        if (this.data && this.data.listings)
        {
            for(const listing of this.data.listings)
            {
                container.appendChild(this.generatePriceListing(listing.name, listing.price, listing.remark));
            }
        }
        else
        {
            container.appendChild(this.generatePriceListing(this.api.i18n.t("Name"), this.api.i18n.t("Price"), this.api.i18n.t("Remark")));
        }

        // Price listing template.
        const pricingTemplate = this.generatePriceListing(this.api.i18n.t("Name"), this.api.i18n.t("Price"), this.api.i18n.t("Remark"));
        pricingTemplate.style.opacity = 0.5;

        // Add "add button".
        const add = document.createElement("button");
        add.title = this.api.i18n.t("Add listing");
        add.className = "mt-10 self-center text-gray-500";
        add.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/></svg>';
        add.type = "button";
        add.onclick = () => add.insertAdjacentElement("beforebegin", this.generatePriceListing(this.api.i18n.t("Name"), this.api.i18n.t("Price"), this.api.i18n.t("Remark")));
        add.onmouseover = () => container.appendChild(pricingTemplate);
        add.onmouseout = () => container.removeChild(pricingTemplate);
        container.appendChild(add);

        return container;
    }

    generatePriceListing(nameValue, priceValue, remarkValue) {
        const container = document.createElement("div");
        container.className = "mt-4 price-listing flex flex-col w-full";

        const remove = document.createElement("button");
        remove.title = this.api.i18n.t("Remove listing");
        remove.className = "ml-3";
        remove.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/></svg>';
        remove.type = "button";
        remove.onclick = () =>
        {
            if (container.parentElement.querySelectorAll(".price-listing").length === 1) return;
            container.parentElement.removeChild(container);
        };

        const priceContainer = document.createElement("div");
        priceContainer.className = "relative inline-flex items-center";
        container.appendChild(priceContainer);

        const name = document.createElement("p");
        name.innerText = nameValue;
        name.className = "name flex-shrink-0 text-lg border-gray-600 focus:border-b-2 outline-none";
        name.role = "textbox";
        name.contentEditable = true;
        priceContainer.appendChild(name);

        const spacer = document.createElement("span");
        spacer.className = "mt-1 mx-2 w-full h-min border-b-2 border-dotted border-spacing-8 border-gray-400";
        priceContainer.appendChild(spacer);
        
        const price = document.createElement("p");
        if (priceValue.type === "a")
            price.innerHTML = `<a href="${priceValue.link}">${priceValue.text}</a>`;
        else if (priceValue.type === "p")
            price.innerText = priceValue.text;
        else
            price.innerText = priceValue;
        price.className = "price flex-shrink-0 text-lg border-gray-600 focus:border-b-2 outline-none";
        price.role = "textbox";
        price.contentEditable = true;
        priceContainer.appendChild(price);
        price.insertAdjacentElement("afterend", remove);

        const remark = document.createElement("p");
        remark.innerText = remarkValue;
        remark.className = "remark italic border-gray-600 focus:border-b-2 outline-none";
        remark.role = "textbox";
        remark.contentEditable = true;
        container.appendChild(remark);

        return container;
    }
  
    save(blockContent) {
        const title = blockContent.querySelector(".title");
        const listings = [];

        for (const element of blockContent.querySelectorAll(".price-listing"))
        {
            const name = element.querySelector(".name");
            const price = element.querySelector(".price");
            const priceLink = price.querySelector("a");
            const remark = element.querySelector(".remark");

            listings.push(
            {
                name: name.innerText,
                price: {
                    type: priceLink ? "a" : "p",
                    link: priceLink ? priceLink.href : "",
                    text: price.innerText
                },
                remark: remark.innerText
            });
        }

        return {
            title: title.innerText,
            listings: listings
        }
    }
}