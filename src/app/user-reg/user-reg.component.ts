import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-reg',
  templateUrl: './user-reg.component.html',
  styleUrls: ['./user-reg.component.css']
})
export class UserRegComponent {
  register: FormGroup;
  checkcredit: FormGroup;
  isValidUser: boolean = false;
  isCheck: boolean = false;
  score: any;
  errMsg: string = '';
  isformValid:boolean=false;
  success: any;
  userData: boolean=false;
  userInfo: any;
  countriesList: any;
  stateList: any;
  cityList: any;
  constructor(private fb: FormBuilder, private http: HttpClient, private router:Router) {
    this.checkcredit = this.fb.group({
      pan: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern(
            /^[A-Z]{3}[ABCFGHLJPTF]{1}[A-Z]{1}[0-9]{4}[A-Z]{1}$/
          ),
        ],
      ],
    });
    this.register = this.fb.group({
      firstName: ['',[Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z]*$/)]],
      lastName: ['',[Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z]*$/)]],
      gender: [''],
      mobile: ['',[Validators.required,  Validators.minLength(10), Validators.pattern(/^[6-9][0-9]{9}$/)]],
      email: ['',[Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      password: ['',[Validators.required, Validators.minLength(8)]],
      address: [''],
      state: [''],
      city: [''],
      country: [''],
      pincode: ['']
    });
  }

  ngOnInit(): void {}

  checkCreditScore() {
    if (this.checkcredit.valid) {
      debugger
      this.http
        .get<any>('http://localhost:8080/checkCredit')
        .subscribe((responce) => {
          console.log(responce)
          this.score = responce.score;
          if (this.score >= 750) {
            this.isValidUser = true;
            this.errMsg=''
          } else {
            this.errMsg = 'Your Not Elegible for Registration';
            this.isValidUser = false;
          }
        });
    } else {
      this.isCheck = true
    }
  }
  userRegistration() {
    if(this.register.valid){
      let req={
        firstName:this.register.value.firstName,
        lastName:this.register.value.lastName,
        mobileNo:this.register.value.mobile,
        email:this.register.value.email,
        password:this.register.value.password,
        gender:this.register.value.gender,
        address:this.register.value.address,
        state:this.register.value.state,
        city:this.register.value.city,
        country:this.register.value.country,
        pincode:this.register.value.pincode

      }
      let url='http://localhost:8090/addUser'
      this.http
      .post<any>(url, req).subscribe(responce =>{
       this.userInfo = responce;
        this.success='User details saved successfully'
        // this.router.navigate(['/customerlist'])
       this.isValidUser=false;
       this. userData=true;
      })
    }else{
      this.success=''
      this.userData=false;
    }
  }
  goToRegister(){
    this.userData=false
    this.checkcredit.reset()
   
  }
  country(){
    let url='http://localhost:8090/countries'
    this.http
        .get(url)
        .subscribe((responce:any)=>{
         this.countriesList=responce
        })
  }
  getStates(event:any){
    console.log(event.target.value)
    this.http
      .get('http://localhost:8090/states', event.target.value).subscribe((responce:any) =>{
       this.stateList = responce;
      })
  }
  getCities(event:any){
    console.log(event.target.value)
    this.http
      .get('http://localhost:8090/cities', event.target.value).subscribe((responce:any) =>{
       this.cityList = responce;
      })
    }
}
