const { detectIntent } = require("../ai/routing/intentRouter");

async function main() {

    console.log(
        await detectIntent(
            "Show chocolate cakes"
        )
    );

    console.log(
        await detectIntent(
            "What is your refund policy?"
        )
    );

    console.log(
        await detectIntent(
            "If I buy a chocolate cake can I cancel it?"
        )
    );

}

main();