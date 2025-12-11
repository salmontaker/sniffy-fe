pipeline {
    agent any

    triggers {
        githubPush()
    }

    tools {
        nodejs 'node-20' 
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                script {
                    def repoUrl = scm.userRemoteConfigs[0].url
                    env.REPO_NAME = repoUrl.tokenize('/').last().replace('.git', '')
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    withCredentials([file(credentialsId: 'sniffy-fe', variable: 'ENV_FILE')]) {
                        try {
                            sh "cp $ENV_FILE .env"
                            sh "npm ci"
                            sh "npm run build"
                        } finally {
                            sh "rm -f .env" 
                        }
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                sh "docker build --label service=${REPO_NAME} -t ${REPO_NAME}:latest ."
                sh "docker stop ${REPO_NAME} || true"
                sh "docker rm ${REPO_NAME} || true"
                sh """
                    docker run \\
                        -d \\
                        --name ${REPO_NAME} \\
                        --network=web \\
                        --restart=always \\
                        ${REPO_NAME}:latest
                """
            }
        }

        stage('Clean Up') {
            steps {
                sh "docker image prune -f --filter 'label=service=${REPO_NAME}' --filter 'dangling=true'"
            }
        }
    }
}