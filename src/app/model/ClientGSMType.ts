export class ClientGSMType {
  public $key: string;
  private name: string;
  private phone: string;
  private firm: string;
  private city: string;


  constructor($key: string, name: string, phone: string, firm: string, city: string) {
    this.$key = $key;
    this.name = name;
    this.phone = phone;
    this.firm = firm;
    this.city = city;
  }
}
