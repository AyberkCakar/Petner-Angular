import { Component, OnInit, Inject, Renderer2 } from '@angular/core';
import { UserModel } from '../user.model'
import { AuthService } from '../../../utils/services';
import { Router } from '@angular/router';
import { ErrorModel } from '../../error.model'
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, private _authService: AuthService,
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document
  ) {

  }
  model: UserModel = new UserModel();
  error: ErrorModel = new ErrorModel();
  public ngOnInit() {

    let script = this._renderer2.createElement('script');

    script.type = `text/javascript`;
    script.text = `
        {
          function togglePassword() {
          var element = document.getElementById("password");
          element.type = element.type == "password" ? "text" : "password";
          }
          
          $(document).ready(function() {
            $('#password').keyup(function() {
                var password = $('#password').val();
                if (checkStrength(password) == 'Strong') {
                    $('#sign-up').attr('disabled', false);
                }
                else{
                  $('#sign-up').attr('disabled', true);
                }
            });
    
            function checkStrength(password) {
                var strength = 0;
    
                    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
                    strength += 1;
                    $('.low-upper-case').addClass('text-success');
                    $('.low-upper-case i').removeClass('fa-file-text').addClass('fa-check');
                    $('#popover-password-top').addClass('hide');
                } else {
                    $('.low-upper-case').removeClass('text-success');
                    $('.low-upper-case i').addClass('fa-file-text').removeClass('fa-check');
                    $('#popover-password-top').removeClass('hide');
                }
    
                if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)) {
                    strength += 1;
                    $('.one-number').addClass('text-success');
                    $('.one-number i').removeClass('fa-file-text').addClass('fa-check');
                    $('#popover-password-top').addClass('hide');
    
                } else {
                    $('.one-number').removeClass('text-success');
                    $('.one-number i').addClass('fa-file-text').removeClass('fa-check');
                    $('#popover-password-top').removeClass('hide');
                }
    
                if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
                    strength += 1;
                    $('.one-special-char').addClass('text-success');
                    $('.one-special-char i').removeClass('fa-file-text').addClass('fa-check');
                    $('#popover-password-top').addClass('hide');
    
                } else {
                    $('.one-special-char').removeClass('text-success');
                    $('.one-special-char i').addClass('fa-file-text').removeClass('fa-check');
                    $('#popover-password-top').removeClass('hide');
                }
    
                if (password.length > 7) {
                    strength += 1;
                    $('.eight-character').addClass('text-success');
                    $('.eight-character i').removeClass('fa-file-text').addClass('fa-check');
                    $('#popover-password-top').addClass('hide');
    
                } else {
                    $('.eight-character').removeClass('text-success');
                    $('.eight-character i').addClass('fa-file-text').removeClass('fa-check');
                    $('#popover-password-top').removeClass('hide');
                }
        
                if (strength < 2) {
                    $('#result').removeClass()
                    $('#password-strength').addClass('progress-bar-danger');
    
                    $('#result').addClass('text-danger').text('Very Week');
                    $('#password-strength').css('width', '10%');
                } else if (strength == 2) {
                    $('#result').addClass('good');
                    $('#password-strength').removeClass('progress-bar-danger');
                    $('#password-strength').addClass('progress-bar-warning');
                    $('#result').addClass('text-warning').text('Week')
                    $('#password-strength').css('width', '60%');
                    return 'Week'
                } else if (strength == 4) {
                    $('#result').removeClass()
                    $('#result').addClass('strong');
                    $('#password-strength').removeClass('progress-bar-warning');
                    $('#password-strength').addClass('progress-bar-success');
                    $('#result').addClass('text-success').text('Strength');
                    $('#password-strength').css('width', '100%');

                    return 'Strong'
                }
            }
        });
        }
    `;

    this._renderer2.appendChild(this._document.body, script);
  }

  async onRegister(name: string, surname: string, number: string, email: string, password: string) {
    this.model.personName = name;
    this.model.personLastName = surname;
    this.model.personPhone = number;
    this.model.personEmail = email;
    this.model.password = password;

    try {
      let response = await this._authService.signupAsync(this.model);
      this.error.error = response['error'];
      this.error.message = response['message'];
      if (this.error.message == 'Kayıt Başarılı') {
        this.router.navigateByUrl('/user-pages/login');
      }

    } catch (e) {
      this.error.error = true;
      this.error.message = '* Girilen Bilgiler Hatalı veya Eksik !';
    }
  }
}
