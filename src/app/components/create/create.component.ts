import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project'
import { ProjectService } from '../../services/project.service'
import { UploadService } from '../../services/upload.service'
import { Global } from '../../services/global'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [
    ProjectService,
    UploadService
  ]
})
export class CreateComponent implements OnInit {
      public title: string
      public url: string
      public project: Project
      public saveProject
      public status: string
      public filesToUpload:Array<File>

      constructor(
        private _projectService: ProjectService,
        private _uploadService: UploadService
      ) { 
          this.title = 'Crear Proyecto'
          this.project = new Project('', '', '', '', 2020, '', '')
          this.url = Global.url
      }

      ngOnInit(): void {
      }

      onSubmit(form){
          //Guardar Datos basicos
          this._projectService.saveProject(this.project).subscribe(
            response =>{
              console.log(response)
              if (response.project) {
                  
                  //Subir Imagen
                  this._uploadService.makeFileRequest(Global.url+'uploadImage/'+response.project._id, [], this.filesToUpload, 'image')
                  .then((result: any)=>{

                    this.saveProject = result.project
                    this.status = 'success'
                    form.reset()
                  })
              } else {
                  this.status = 'failed'
              }
            },
            error=>{
              console.log(<any>error)
            }
          )
      }

      fileChangeEvent(fileInput: any){
        console.log(fileInput)
          this.filesToUpload = <Array<File>>fileInput.target.files
      }
}
