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
                script {
                    def repoUrl = scm.userRemoteConfigs[0].url
                    def repoName = repoUrl.tokenize('/').last().replace('.git', '')

                    sh "docker build -t ${repoName}:latest ."
                    sh "docker stop ${repoName} || true"
                    sh "docker rm ${repoName} || true"
                    sh """
                        docker run \\
                            -d \\
                            --name ${repoName} \\
                            --network=web \\
                            --restart=always \\
                            ${repoName}:latest
                    """
                }
            }
        }

        stage('Clean Up') {
            steps {
                sh 'docker image prune -f --filter "dangling=true"'
            }
        }
    }
}