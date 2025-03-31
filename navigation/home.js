    var quotes = [
        "The quick brown fox jumps over the lazy dog.",
        "Look out! There are llamas!",
        "No, really, don't get up.",
        "Whatever",
        "Etc.",
        "egassem sdrawkcab.",
        "retsis ym tib ecno esoom A .esoom citsejam eht gnidulcnI ,slamina yrruf gnitseretni inam dnA metsys enohpelet lufrednow eht,sekal ilevol eht ees dna rey siht nedeewS ni yadiloh a iert ton iW.",
        "LOL",
        "You got games on your phone?",
        "Teeth are just tiny hardened bats sleeping upside down.",
        "All Work and no play makes jack a dull boy.",
        "Do not trust anyone you see wearing this costume.",
        "You are receiving this email because Santa Claus has chosen you.",
        "WE MUST SURVIVE.",
        "Build a better mousetrap and get smarter mice.",
        "Block one site and two more shall take its place.",
        "Lorem ipsum dolor sit amet, adipiscing consequat adipiscing sit amet. In tortor dolor, sollicitudin quis urna vitae, rutrum selecrelico dolor. Ut facilisis ornare lacus, ut dictum felis aliquam ut. Omnino interdum fit cum cura. Non est aequum, non solum, sed nec refert quis sit terra. Sed vestibulum a tellus non semper. Aliquam a neque euismod dolor dapibus aliquet ultricies ut nibh. Sed eget auctor ante. Aliquam dictum volutpat vestibulum. Putasti ovum paschale futurum. Nullo modo",
        "check steam",
        "We are all E G G",
        "Cephalopod Conundrums",
        "SOMETHING WONDERFUL HAS HAPPNED",
        "herding cats",
        "As seen on TV!",
        "Kind of dragon free!",
        "One of a kind!",
        "Yaaay!",
        "The bee's knees!",
        "Baby Yoda Is Our Leader",
        "Random splash!",
        "Uninflammable!",
        "Happiness has to be fought for.",
        "Cogito ergo sum!",
        "and then a skeleton popped out!",
        "I miss the cheese chain",
        "Cow Tools!",
    ];

    // Function to display a random quote
    function displayRandomQuote() {
        var q = quotes[Math.floor(Math.random() * quotes.length)];
        document.getElementById("test").innerHTML = q;
    }

    // Display a random quote on page load
    window.onload = displayRandomQuote;
