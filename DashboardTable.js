class DashboardTable extends VBox {
    constructor(data) {
        super();
        this.initializeUI(data);
    }

    initializeUI(data) {
        this.setSpacing(10);
        this.setPrefHeight(25);

        const tableView = new TableView();
        tableView.setPrefWidth(600);
        tableView.setPrefHeight(300);

        const monthColumn = new TableColumn("Mês");
        monthColumn.setCellValueFactory(new PropertyValueFactory("label"));

        const billingColumn = new TableColumn("Faturamento");
        billingColumn.setCellValueFactory(new PropertyValueFactory("billing"));

        const salesColumn = new TableColumn("Qtd.");
        salesColumn.setCellValueFactory(new PropertyValueFactory("sales"));

        const averageTicketColumn = new TableColumn("Ticket Médio");
        averageTicketColumn.setCellValueFactory(new PropertyValueFactory("averageTicket"));

        const currencyFormat = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

        monthColumn.setCellFactory(tc => new TableCell(currencyFormat));
        billingColumn.setCellFactory(tc => new TableCell(currencyFormat));
        averageTicketColumn.setCellFactory(tc => new TableCell(currencyFormat));

        tableView.getColumns().addAll(monthColumn, billingColumn, salesColumn, averageTicketColumn);
        tableView.getItems().addAll(data);

        this.getChildren().add(tableView);
    }
}

class TableCell extends javafx.scene.control.TableCell {
    constructor(format) {
        super();
        this.format = format;
    }

    updateItem(item, empty) {
        super.updateItem(item, empty);

        if (empty || item == null) {
            this.setText(null);
        } else {
            this.setText(this.format.format(item));
        }
    }
}
