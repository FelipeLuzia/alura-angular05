import { Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription, map, switchMap } from 'rxjs';
import { Item, Livro } from 'src/app/models/interfaces';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
})
export class ListaLivrosComponent implements OnDestroy {
  listaLivros: Livro[];
  campoBusca = new FormControl();
  subscription: Subscription;
  livro: Livro;

  constructor(private service: LivroService) {}

  livrosEncontrados$ = this.campoBusca.valueChanges
    .pipe(
      switchMap(valorDigitado => this.service.buscar
        (valorDigitado)),
        map(items => {
          console.log('Requisições ao servidor');
          this.listaLivros = this.livrosResultadoParaLivros(items);
        })
    )

  // buscarLivros(): void {
  //   this.subscription = this.service.buscar(this.campoBusca).subscribe({
  //     next: (items) => {
  //       console.log('Requisições ao servidor');
  //       this.listaLivros = this.livrosResultadoParaLivros(items);
  //     },
  //     error: (erro) => console.error(erro),
  //   });
  // }

  // .subscribe(data => this.config = {
  //   heroesUrl: (data as any).heroesUtl,
  //   textfile: (data as any).textfile,
  // });

  livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
    return items.map(item => {
      return new LivroVolumeInfo(item);
    })
  }

  ngOnDestroy(): void {
    console.log('Destroy');
    this.subscription.unsubscribe();
  }
}
