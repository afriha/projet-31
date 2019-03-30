#/bin/sh
#Installation de node

echo "Installation de node"
VERSION=v10.15.0
 DISTRO=linux-x64
 sudo mkdir /usr/local/lib/nodejs
 sudo tar -xJvf node-$VERSION-$DISTRO.tar.xz -C /usr/local/lib/nodejs 
 sudo mv /usr/local/lib/nodejs/node-$VERSION-$DISTRO /usr/local/lib/nodejs/node-$VERSION
# Nodejs

cat << EOF >> ~/.profile
export NODEJS_HOME=/usr/local/lib/nodejs/node-v10.15.0/bin
export PATH=$NODEJS_HOME:$PATH
EOF

# Create a sudo link:
sudo ln -s /usr/local/lib/nodejs/node-v10.15.0/bin/node /usr/bin/node
sudo ln -s /usr/local/lib/nodejs/node-v10.15.0/bin/npm /usr/bin/npm
sudo ln -s /usr/local/lib/nodejs/node-v10.15.0/bin/npx /usr/bin/npx
 
#Permission Calculatrice
chmod 755 calculsimple.out

#Installation du projet
echo "Installation du projet"
npm run first-start

#Lancement du projet 
echo "Lancement du projet"
npm start




