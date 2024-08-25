class YearSelector extends HBox {
    constructor(years) {
        super();
        this.years = years;
        this.selectedYear = years[years.length - 1];
        this.initializeUI();
    }

    initializeUI() {
        this.setSpacing(10);

        const decrementButton = new Button("◄");
        decrementButton.setOnAction(event => {
            this.decrementYear();
        });
        decrementButton.setDisable(this.selectedYear === this.years[0]);

        const yearLabel = new Label("Ano: " + this.selectedYear);

        const incrementButton = new Button("►");
        incrementButton.setOnAction(event => {
            this.incrementYear();
        });
        incrementButton.setDisable(this.selectedYear === this.years[this.years.length - 1]);

        this.getChildren().addAll(decrementButton, yearLabel, incrementButton);
    }

    emitYearSelected() {
        // Implemente a lógica para emitir o ano selecionado
        // this.fireEvent(new YearSelectedEvent(this.selectedYear));
    }

    incrementYear() {
        if (this.selectedYear < this.years[this.years.length - 1]) {
            this.selectedYear++;
            this.emitYearSelected();
        }
    }

    decrementYear() {
        if (this.selectedYear > this.years[0]) {
            this.selectedYear--;
            this.emitYearSelected();
        }
    }
}
