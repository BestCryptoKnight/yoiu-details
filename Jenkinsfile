pipeline {
  agent any
  environment {
    AWS_ACCOUNT_ID="797952964647"
    AWS_DEFAULT_REGION="ap-northeast-1" 
    CLUSTER_NAME="yoiu-stage-cluster-1"
    SERVICE_NAME="yoiu-stage-container-service"
    TASK_DEFINITION_NAME="yoiu-task-definition"
    DESIRED_COUNT="1"
    IMAGE_REPO_NAME="yoiu-stage"
    IMAGE_TAG="${env.BUILD_ID}"
    REPOSITORY_URI = "797952964647.dkr.ecr.ap-northeast-1.amazonaws.com/yoiu-stage"
    registryCredential = "yoiu"
  }
  
  stages {
    // Building Docker images
    stage('Building image') {
      steps{
        script {
          dockerImage = docker.build("${IMAGE_REPO_NAME}:${IMAGE_TAG}")
        }
      }
    }
   
    // Uploading Docker images into AWS ECR
    stage('Pushing to ECR') {
      steps {  
        script {
			    docker.withRegistry("https://" + REPOSITORY_URI, "ecr:${AWS_DEFAULT_REGION}:" + registryCredential) {
            dockerImage.push()
          }
        }
      }
    }
      
    stage('Deploy') {
      steps{
        withAWS(credentials: registryCredential, region: "${AWS_DEFAULT_REGION}") {
          script {
			      sh './script.sh'
          }
        } 
      }
    }      
  }
}

