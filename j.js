Const Inputs = Document.QuerySelector(".Inputs"),
HintTag = Document.QuerySelector(".Hint Span"),
GuessLeft = Document.QuerySelector(".Guess-Left Span"),
WrongLetter = Document.QuerySelector(".Wrong-Letter Span"),
ResetBtn = Document.QuerySelector(".Reset-Btn"),
TypingInput = Document.QuerySelector(".Typing-Input");

Let Word, MaxGuesses, IncorrectLetters = [], CorrectLetters = [];

Function RandomWord() {
    Let RanItem = WordList[Math.Floor(Math.Random() * WordList.Length)];
    Word = RanItem.Word;
    MaxGuesses = Word.Length >= 5 ? 8 : 6;
    CorrectLetters = []; IncorrectLetters = [];
    HintTag.InnerText = RanItem.Hint;
    GuessLeft.InnerText = MaxGuesses;
    WrongLetter.InnerText = IncorrectLetters;

    Let Html = "";
    For (Let I = 0; I < Word.Length; I++) {
        Html += `<Input Type="Text" Disabled>`;
        Inputs.InnerHTML = Html;
    }
}
RandomWord();

Function InitGame(E) {
    Let Key = E.Target.Value.ToLowerCase();
    If(Key.Match(/^[A-Za-Z]+$/) && !IncorrectLetters.Includes(` ${Key}`) && !CorrectLetters.Includes(Key)) {
        If(Word.Includes(Key)) {
            For (Let I = 0; I < Word.Length; I++) {
                If(Word[I] == Key) {
                    CorrectLetters += Key;
                    Inputs.QuerySelectorAll("Input")[I].Value = Key;
                }
            }
        } Else {
            MaxGuesses--;
            IncorrectLetters.Push(` ${Key}`);
        }
        GuessLeft.InnerText = MaxGuesses;
        WrongLetter.InnerText = IncorrectLetters;
    }
    TypingInput.Value = "";

    SetTimeout(() => {
        If(CorrectLetters.Length === Word.Length) {
            Alert(`Congrats! You Found The Word ${Word.ToUpperCase()}`);
            Return RandomWord();
        } Else If(MaxGuesses < 1) {
            Alert("Game Over! You Don't Have Remaining Guesses");
            For(Let I = 0; I < Word.Length; I++) {
                Inputs.QuerySelectorAll("Input")[I].Value = Word[I];
            }
        }
    }, 100);
}

ResetBtn.AddEventListener("Click", RandomWord);
TypingInput.AddEventListener("Input", InitGame);
Inputs.AddEventListener("Click", () => TypingInput.Focus());
Document.AddEventListener("Keydown", () => TypingInput.Focus());