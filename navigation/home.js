    var quotes = [
        "The quick brown fox jumps over the lazy dog.",
        "Look out! There are llamas!",
        "No, really, don't get up.",
        "Whatever",
        "Etc.",
        "egassem sdrawkcab.",
        "retsis ym tib ecno esoom A .esoom citsejam eht gnidulcnI ,slamina yrruf gnitseretni inam dnA ,metsys enohpelet lufrednow ehT ,sekal ilevol eht eeS ?rey siht nedeewS ni yadiloh a iert ton iW",
        "LOL",
        "You got games on your phone?",
        "Teeth are just tiny hardened bats sleeping upside down.",
        "All Work and no play makes jack a dull boy.",
        "Do not trust anyone you see wearing this costume.",
        "You are receiving this email because Santa Claus has chosen you.",
        "WE MUST SURVIVE.",
        "Build a better mousetrap and get smarter mice.",
        "Block one site and two more shall take its place.",
        "Lorem ipsum dolor sit amet, adipiscing consequat adipiscing sit amet...",
        "check steam",
        "We are all E G G",
        "Cephalopod Conundrums",
        "SOMETHING WONDERFUL HAS HAPPNED",
        "Me when get",
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
        "Deltarune Tomorrow",
        "Cow tools",
        "Your sister knows"
        "Grammy warned you not to talk to the wind, but you went ahead and talked to the wind, didn't you? Grammy warned you!"
        "SEE HOW THE SERFS WORK THE GROUND"
    ];

    // Function to display a random quote
    function displayRandomQuote() {
        var q = quotes[Math.floor(Math.random() * quotes.length)];
        document.getElementById("test").innerHTML = q;
    }

    // Display a random quote on page load
    window.onload = displayRandomQuote;
