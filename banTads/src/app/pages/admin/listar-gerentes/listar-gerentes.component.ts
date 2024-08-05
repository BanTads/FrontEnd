import {Component, ViewChild} from '@angular/core';
import {Gerente} from "../../../models/gerente.model";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";
import {AdminService} from "../../../services/admin.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-listar-gerentes',
  templateUrl: './listar-gerentes.component.html',
  styleUrl: './listar-gerentes.component.scss'
})
export class ListarGerentesComponent {
  gerentes: Gerente[] = [];
  firstButtonColor="#CC6E00";
  secondButtonColor= "error";


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<Gerente>;

  constructor(
    private adminService: AdminService,
    private router: Router,
    private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loadGerentes();
  }


  loadGerentes(): void{
    this.adminService.getRelatorioGerentes().subscribe((data: Gerente[]) => {
      console.log("response", data);
      this.gerentes = data;
      console.log(this.gerentes);
      this.dataSource = new MatTableDataSource(this.gerentes);
      this.dataSource.paginator = this.paginator;
    });
  }

  editarGerente(gerente:Gerente){
    console.log("gerente do componente:", gerente);
    this.router.navigate(['editar-gerente'], {
      queryParams: {
        id: gerente.id,
        nome: gerente.nome,
        email: gerente.email,
        telefone: gerente.telefone,
        cpf: gerente.cpf
      }
    });
  }

  novoGerente(){
    this.router.navigate(['editar-gerente']);
  }


  deleteGerente(gerente: Gerente) {
    this.adminService.deleteGerente(gerente).subscribe({
      next: (response) => {
        if (response.success) {
          this.toastr.success('Gerente apagado com sucesso!');
          this.gerentes = this.gerentes.filter(g => g.id !== gerente.id);
          this.dataSource.data = this.gerentes;
        } else {
          this.toastr.error('Erro ao apagar Gerente');
        }
      },
      error: () => {
        this.toastr.error('Erro ao apagar Gerente');
      }
    });
  }


}
