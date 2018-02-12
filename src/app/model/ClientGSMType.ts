export class ClientGSMType {
  private $key: string;
  private name: string;
  private phone: string;
  private city: string;


  constructor($key: string, name: string, phone: string, city: string) {
    this.$key = $key;
    this.name = name;
    this.phone = phone;
    this.city = city;
  }
}
