import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {IncomeDto} from './income-dto';
import {IncomeService} from './income.service';
import {EMPTY, Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class IncomeResolverService implements Resolve<IncomeDto[]> {


  constructor(private incomeService: IncomeService,
              private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IncomeDto[]> | Promise<IncomeDto[]> | IncomeDto[] {
    console.log('Income Resolver');
    return this.incomeService.getIncomeList().pipe(
      catchError( (err) => {
        this.router.navigateByUrl('/error');

        return EMPTY;
      })
    );
  }
}
