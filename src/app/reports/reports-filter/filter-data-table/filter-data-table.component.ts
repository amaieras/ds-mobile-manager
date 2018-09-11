import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

/** Constants used to fill up our data base. */
const COLORS: string[] = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
  'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
const NAMES: string[] = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
  'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
  'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];

@Component({
  selector: 'app-filter-data-table',
  templateUrl: './filter-data-table.component.html',
  styleUrls: ['./filter-data-table.component.scss']
})
export class FilterDataTableComponent implements OnInit {
  displayedColumns = ['addedDate', 'lastname', 'phoneList', 'problems', 'priceOffer', 'deliveredDate'];
  dataSource: any = [];
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  getFilteredClients(filteredClients) {
     this.dataSource = new MatTableDataSource(filteredClients);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
